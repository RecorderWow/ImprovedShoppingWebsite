const express = require('express');
const router = express.Router();
const pool = require('../db');
const authMiddleware = require('../middleware/authMiddleware');



// GET ALL PRODUCTS
router.get('/', async (req, res) => {
    try {

        const { search } = req.query;

        let query = 'SELECT * FROM products';
        let params = [];

        // LIVE SEARCH
        if (search) {
            query += ' WHERE name ILIKE $1';
            params.push(`%${search}%`);
        }

        const result = await pool.query(query, params);

        res.json(result.rows);

    } catch (err) {

        console.error("PRODUCT FETCH ERROR:", err);

        res.status(500).json({
            error: "Server error"
        });
    }
});



// GET USER CART
router.get('/cart', authMiddleware, async (req, res) => {

    try {

        const result = await pool.query(
            `
            SELECT 
                cart.id AS cart_id,
                products.*,
                cart.quantity
            FROM cart
            JOIN products
                ON cart.product_id = products.id
            WHERE cart.user_id = $1
            `,
            [req.user.id]
        );

        res.json(result.rows);

    } catch (err) {

        console.error("GET CART ERROR:", err);

        res.status(500).json({
            error: "Failed to load cart"
        });
    }
});



// ADD TO CART
router.post('/cart', authMiddleware, async (req, res) => {

    try {

        const { product_id, quantity } = req.body;

        // VALIDATION
        if (!product_id) {
            return res.status(400).json({
                error: "Product ID required"
            });
        }

        const user_id = req.user.id;

        // CHECK IF PRODUCT ALREADY EXISTS
        const existing = await pool.query(
            `
            SELECT * FROM cart
            WHERE user_id = $1
            AND product_id = $2
            `,
            [user_id, product_id]
        );

        // IF PRODUCT EXISTS UPDATE QUANTITY
        if (existing.rows.length > 0) {

            const currentQuantity = existing.rows[0].quantity;

            const updated = await pool.query(
                `
                UPDATE cart
                SET quantity = $1
                WHERE id = $2
                RETURNING *
                `,
                [
                    currentQuantity + (quantity || 1),
                    existing.rows[0].id
                ]
            );

            return res.json(updated.rows[0]);
        }

        // NEW PRODUCT
        const result = await pool.query(
            `
            INSERT INTO cart
            (product_id, quantity, user_id)
            VALUES ($1, $2, $3)
            RETURNING *
            `,
            [
                product_id,
                quantity || 1,
                user_id
            ]
        );

        res.json(result.rows[0]);

    } catch (err) {

        console.error("ADD TO CART ERROR:", err);

        res.status(500).json({
            error: "Failed to add to cart"
        });
    }
});



// UPDATE CART QUANTITY
router.put('/cart/:id', authMiddleware, async (req, res) => {

    try {

        const { id } = req.params;
        const { quantity } = req.body;

        // VALIDATION
        if (!quantity || quantity < 1) {
            return res.status(400).json({
                error: "Quantity must be at least 1"
            });
        }

        const result = await pool.query(
            `
            UPDATE cart
            SET quantity = $1
            WHERE id = $2
            RETURNING *
            `,
            [quantity, id]
        );

        res.json(result.rows[0]);

    } catch (err) {

        console.error("UPDATE CART ERROR:", err);

        res.status(500).json({
            error: "Failed to update cart"
        });
    }
});



// DELETE CART ITEM
router.delete('/cart/:id', authMiddleware, async (req, res) => {

    try {

        const { id } = req.params;

        await pool.query(
            'DELETE FROM cart WHERE id = $1',
            [id]
        );

        res.sendStatus(204);

    } catch (err) {

        console.error("DELETE CART ERROR:", err);

        res.status(500).json({
            error: "Failed to remove item"
        });
    }
});


module.exports = router;