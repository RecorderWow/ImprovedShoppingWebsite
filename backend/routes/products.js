const express = require('express');
const router = express.Router();
const pool = require('../db');
const authMiddleware = require('../middleware/authMiddleware');

// GET all products
router.get('/', async (req, res) => {
    try {
        const { search } = req.query;

        let query = 'SELECT * FROM products';
        let params = [];

        if (search) {
            query += ' WHERE name ILIKE $1';
            params.push(`%${search}%`);
        }

        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});
// CRUD for cart

// GET cart items
router.get('/cart', authMiddleware, async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT cart.id AS cart_id, products.*, cart.quantity
            FROM cart
            JOIN products ON cart.product_id = products.id
            WHERE cart.user_id = $1
        `, [req.user.id]);

        res.json(result.rows);

    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// ADD to cart
router.post('/cart', authMiddleware, async (req, res) => {
    const { product_id, quantity } = req.body;

    try {
        // check for if already exists for THIS USER
        const existing = await pool.query(
            'SELECT * FROM cart WHERE product_id=$1 AND user_id=$2',
            [product_id, req.user.id]
        );

        if (existing.rows.length > 0) {
            const currentQuantity = existing.rows[0].quantity;

            const updated = await pool.query(
                'UPDATE cart SET quantity=$1 WHERE id=$2 RETURNING *',
                [currentQuantity + quantity, existing.rows[0].id]
            );

            return res.json(updated.rows[0]);
        }

        const result = await pool.query(
            `
            INSERT INTO cart (product_id, quantity, user_id)
            VALUES ($1, $2, $3)
            RETURNING *
            `,
            [product_id, quantity, req.user.id]
        );

        res.json(result.rows[0]);

    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// UPDATE cart item quantity
router.put('/cart/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
    try {
        const result = await pool.query(
            'UPDATE cart SET quantity=$1 WHERE id=$2 RETURNING *',
            [quantity, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// DELETE cart item
router.delete('/cart/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM cart WHERE id=$1', [id]);
        res.sendStatus(204);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;