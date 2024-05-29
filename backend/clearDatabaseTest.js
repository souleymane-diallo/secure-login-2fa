const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const databaseFilePath = process.env.DATABASE_URL.replace('sqlite:', '');
const db = new sqlite3.Database(databaseFilePath);

const clearDatabase = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.exec("BEGIN TRANSACTION;");
      db.exec("DELETE FROM users;", (error) => {
        if (error) {
          db.exec("ROLLBACK;");
          reject(error);
        } else {
          db.exec("COMMIT;");
          resolve();
        }
      });
    });
  });
};

module.exports = clearDatabase; 
