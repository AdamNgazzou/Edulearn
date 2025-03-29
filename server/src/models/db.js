require('dotenv').config();
const { Pool } = require('pg'); // Use pg (node-postgres) instead of neon serverless

// Destructure environment variables
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT } = process.env;

// Setup the PostgreSQL connection db
const db = new Pool({
    user: PGUSER,
    host: PGHOST,
    database: PGDATABASE,
    password: PGPASSWORD,
    port: PGPORT || 5432,  // Default port for PostgreSQL
    ssl: { rejectUnauthorized: false },  // SSL connection for Neon
});

// Export the db instance for querying
module.exports = db;
