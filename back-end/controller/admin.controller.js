const connection = require('../db')

module.exports = {
    add: async (req, res) => {
        const { username, password, name } = req.body;
        try {
            const query = `INSERT INTO user (username, password, role, name) VALUES ('${username}', '${password}', ${0}, '${name}')`;
            await new Promise((resolve, reject) => {
                connection.query(query, (error) => {
                    if (error) {
                        console.error('Error creating user: ', error);
                        reject(error);
                    } else {
                        resolve();
                    }
                });
            });
            return res.json({ success: true });
        } catch (error) {
            console.error('Error creating user: ', error);
            return res.json({ success: false });
        }
    },
    getAll: async (req, res) => {
        try {
            const query = `SELECT * FROM user WHERE role = 0`;
            const result = await new Promise((resolve, reject) => {
                connection.query(query, (error, results) => {
                    if (error) {
                        console.error('Error getting user: ', error);
                        reject(error);
                    } else {
                        resolve(results);
                    }
                });
            });
            return res.json({ success: true, data: result });
        } catch (error) {
            console.error('Error getting user: ', error);
            return res.json({ success: false });
        }
    },
    update: async (req, res) => {
        const { id } = req.params;
        const { username, password, name } = req.body;
        try {
            const query = `UPDATE user SET username='${username}', password='${password}', name='${name}' WHERE id=${id}`;
            await new Promise((resolve, reject) => {
                connection.query(query, (error) => {
                    if (error) {
                        console.error('Error updating user: ', error);
                        reject(error);
                    } else {
                        resolve();
                    }
                });
            });
            return res.json({ success: true });
        } catch (error) {
            console.error('Error updating user: ', error);
            return res.json({ success: false });
        }
    },
    delete: async (req, res) => {
        const { id } = req.params;
        try {
            const query = `DELETE FROM user WHERE id = ${id}`;
            await new Promise((resolve, reject) => {
                connection.query(query, (error) => {
                    if (error) {
                        console.error('Error deleting user: ', error);
                        reject(error);
                    } else {
                        resolve();
                    }
                });
            });
            return res.json({ success: true });
        } catch (error) {
            console.error('Error deleting user: ', error);
            return res.json({ success: false });
        }
    }
}