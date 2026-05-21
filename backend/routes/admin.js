const express = require('express');
const router = express.Router();
const pool = require('../db');
const jwt = require('jsonwebtoken');

const SECRET = 'mysecretkey';

// MIDDLEWARE VERIFY TOKEN
function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid token" });
    }
}

// ADMIN ONLY MIDDLEWARE
function adminOnly(req, res, next) {
    if (!req.user.is_admin) {
        return res.status(403).json({ error: "Admins only" });
    }
    next();
}

router.get('/users', authMiddleware, adminOnly, async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                users.id AS user_id,
                users.username,
                cart.id AS cart_id,
                products.name,
                cart.quantity
            FROM users
            LEFT JOIN cart ON users.id = cart.user_id
            LEFT JOIN products ON cart.product_id = products.id
            ORDER BY users.id;
        `);

        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;