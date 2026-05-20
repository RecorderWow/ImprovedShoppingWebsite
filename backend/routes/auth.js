const express = require('express');
const router = express.Router();
const pool = require('../db');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = 'mysecretkey';


// REGISTER
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        // VALIDATION CHECKS
        if (!username || !password) {
            return res.status(400).json({
                error: "Username and password are required"
            });
        }

        if (username.trim().length < 3) {
            return res.status(400).json({
                error: "Username must be at least 3 characters"
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                error: "Password must be at least 6 characters"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username',
            [username.trim(), hashedPassword]
        );

        res.json(result.rows[0]);

    } catch (err) {
        if (err.code === '23505') {
            return res.status(400).json({
                error: "Username already exists"
            });
        }

        console.error(err);
        res.status(500).json({
            error: "Server error"
        });
    }
});


// LOGIN
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await pool.query(
            'SELECT * FROM users WHERE username=$1',
            [username]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'User not found' });
        }

        const user = result.rows[0];

        // compare password
        const validPassword = await bcrypt.compare(
            password,
            user.password
        );

        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // create token
        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                is_admin: user.is_admin
            },
            SECRET,
            { expiresIn: '1d' }
        );

        res.json({ token });

    } catch (err) {
        console.error(err);
        res.status(500).send('Login error');
    }
});

module.exports = router;