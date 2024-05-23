// backend/clearUsers.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Utilisez un fichier de base de données persistant
const dbPath = path.resolve(__dirname, 'users.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    db.run("DELETE FROM users", (err) => {
        if (err) {
            console.error("Error deleting users:", err.message);
        } else {
            console.log("All users deleted.");
        }
    });
});

db.close();
