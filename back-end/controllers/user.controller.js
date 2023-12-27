const connection = require('../db')

module.exports = {
    getAll: async (req, res) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM user', (error, results, fields) => {
                if (error) {
                    console.error('Error getting users: ', error);
                    reject(error);
                } else {
                    return res.json({ success: true, data: results })
                }
            });
        });
    },

    login: async (req, res) => {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.json({ success: false, data: [], message: "Thiếu username hoặc password" })
        }

        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM user WHERE username = ? AND password = ?', [username, password], (error, results, fields) => {
                if (error) {
                    console.error('', error);
                    reject(error);
                } else {
                    return res.json({ success: true, data: results })
                }
            });
        })
    }
}