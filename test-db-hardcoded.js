const { Pool } = require('pg');

const pool = new Pool({
    connectionString: "postgresql://matchabih:matchabih123@127.0.0.1:5433/matchabih?schema=public"
});

async function testConnection() {
    try {
        const res = await pool.query('SELECT NOW()');
        console.log('Connection successful:', res.rows[0]);
        process.exit(0);
    } catch (err) {
        console.error('Connection error:', err);
        process.exit(1);
    }
}

testConnection();
