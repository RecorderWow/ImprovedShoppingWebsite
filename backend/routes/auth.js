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
        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // insert user
        const result = await pool.query(
            'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username',
            [username, hashedPassword]
        );

        res.json(result.rows[0]);

    } catch (err) {
        console.error(err);
        res.status(500).send('Register error');
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