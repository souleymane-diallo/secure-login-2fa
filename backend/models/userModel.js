const db = require('./db');

const createUser = async (email, hashedPassword) => {
    return new Promise((resolve, reject) => {
        db.run("INSERT INTO users (email, password) VALUES (?, ?)", [email, hashedPassword], function (err) {
            if (err) reject(err);
            else resolve({ id: this.lastID });
        });
    });
};

const findUserByEmail = async (email) => {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
};

const findUserById = async (userId) => {
    return new Promise((resolve, reject) => {
        db.get("SELECT id, email FROM users WHERE id = ?", [userId], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
};

const updateUserSecret = async (userId, secret) => {
    return new Promise((resolve, reject) => {
        db.run("UPDATE users SET secret = ? WHERE id = ?", [secret, userId], function (err) {
            if (err) reject(err);
            else resolve();
        });
    });
};

const findUserSecretById = async (userId) => {
    return new Promise((resolve, reject) => {
        db.get("SELECT secret FROM users WHERE id = ?", [userId], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
};

module.exports = {
    createUser,
    findUserByEmail,
    findUserById,
    updateUserSecret,
    findUserSecretById
};

