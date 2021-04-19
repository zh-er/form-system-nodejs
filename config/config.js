const dotenv = require('dotenv');
dotenv.config()

module.exports = {
    SQLITE3_DB: process.env.SQLITE3_DB ?? 'db.sqlite3',
    JWT_SECRET: 'NTT_DATA_123',
    DEFAULT_ADMIN_EMAIL: 'admin@test.com',
    DEFAULT_ADMIN_PASSWORD: '123456',
    DEFAULT_ADMIN_USERNAME: 'admin',
}

