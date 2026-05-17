const { Pool } = require('pg');

const pool = new Pool({
    user: 'shopping_user',
    host: 'localhost',
    database: 'shopping_cart_db',
    password: 'k2ma!.sj',
    port: 5432,
});

module.exports = pool;