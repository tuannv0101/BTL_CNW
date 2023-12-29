const connection = require('../db')

module.exports = {
    getAll: async (req, res) => {
        const { userId } = req.body
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM food WHERE idUser = ? AND isDeleted = 0`, [userId],
                (error, results, fields) => {
                    if (error) {
                        console.error('Error get food: ', error);
                        reject(error);
                    } else {
                        return res.json({ success: true, data: results })
                    }
                }
            )
        })
    },
    add: async (req, res) => {
        const { name, unit, image, type, idUser } = req.body
        const query = `INSERT INTO food (name, unit, image, type, idUser, createdByAdmin, isDeleted) VALUES (?, ?, ?, ?, ?, 0, 0)`
        try {
            await new Promise((resolve, reject) => {
                connection.query(query, [name, unit, image, type, idUser],
                    (error, results, fields) => {
                        if (error) {
                            console.error('Error add food: ', error);
                            reject(error);
                        } else {
                            return res.json({ success: true })
                        }
                    }
                )
            })
        } catch (error) {
            return res.json({ success: false, message: 'Error adding food' })
        }
    },
    delete: async (req, res) => {
        const idFood = req.params.idFood
        try {
            const query = `UPDATE food SET isDeleted = 1 WHERE id = ?`
            await new Promise((resolve, reject) => {
                connection.query(query, [idFood], (error) => {
                    if (error) {
                        console.error('Error delete food: ', error);
                        reject(error);
                    } else {
                        resolve();
                    }
                });
            });
            return res.json({ success: true });
        } catch (error) {
            console.error('Error delete food: ', error);
            return res.json({ success: false });
        }
    }
}