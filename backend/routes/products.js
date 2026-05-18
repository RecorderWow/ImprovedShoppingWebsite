const express = require('express');
const router = express.Router();
const pool = require('../db');

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
router.get('/cart', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT cart.id AS cart_id, products.* , cart.quantity 
            FROM cart 
            JOIN products ON cart.product_id = products.id
        `);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// ADD to cart
router.post('/cart', async (req, res) => {
    const { product_id, quantity } = req.body;

    try {
        const result = await pool.query(`
            INSERT INTO cart (product_id, quantity)
            VALUES ($1, $2)
            ON CONFLICT (product_id)
            DO UPDATE SET quantity = cart.quantity + EXCLUDED.quantity
            RETURNING *;
        `, [product_id, quantity]);

        res.json(result.rows[0]);

    } catch (err) {
        console.error("CART ERROR:", err);
        res.status(500).json({ error: err.message });
    }
});

// UPDATE cart item quantity
router.put('/cart/:id', async (req, res) => {
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
router.delete('/cart/:id', async (req, res) => {
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