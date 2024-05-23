const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const databaseFilePath = path.resolve(__dirname, 'users.db');
const database = new sqlite3.Database(databaseFilePath);

database.serialize(() => {
    const createUsersTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            secret TEXT
        )
    `;
    database.run(createUsersTableQuery, (error) => {
        if (error) {
            console.error("Error creating 'users' table:", error.message);
        } else {
            console.log("'users' table created or already exists.");
        }
    });
});

module.exports = database;