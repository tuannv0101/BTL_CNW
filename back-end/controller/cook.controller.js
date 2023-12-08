const connection = require('../db')

module.exports = {
    getAll: async (req, res) => {
        const idUser = req.params.idUser
        try {
            const query = `SELECT * FROM cook WHERE idUser = ?`
            const rows = await new Promise((resolve, reject) => {
                connection.query(query, [idUser], (error, results) => {
                    if (error) {
                        console.error('Error getting cook: ', error);
                        reject(error);
                    } else {
                        resolve(results);
                    }
                });
            });

            const data = rows.map(row => ({
                id: row.id,
                state: row.state,
                date: row.date,
                idRecipe: row.idRecipe
            }))

            return res.json({ success: true, data })
        } catch (error) {
            console.error('Error: ', error);
            return res.json({ success: false });
        }
    },
    add: async (req, res) => {
        const { date, idUser, idRecipe, state } = req.body
        const query = `INSERT INTO cook (idRecipe, date, idUser, state) VALUES (?, ?, ?, ?)`
        try {
            await new Promise((resolve, reject) => {
                connection.query(query, [idRecipe, date, idUser, state],
                    (error, results, fields) => {
                        if (error) {
                            console.error('Error add cook: ', error);
                            reject(error);
                        } else {
                            return res.json({ success: true })
                        }
                    }
                )
            })
        } catch (error) {
            return res.json({ success: false, message: 'Error adding cook' })
        }

    },
    delete: async (req, res) => {
        const { id } = req.params;
        try {
            const query = `DELETE FROM cook WHERE id = ${id}`;
            await new Promise((resolve, reject) => {
                connection.query(query, (error) => {
                    if (error) {
                        console.error('Error deleting cook: ', error);
                        reject(error);
                    } else {
                        resolve();
                    }
                });
            });
            return res.json({ success: true });
        } catch (error) {
            console.error('Error deleting cook: ', error);
            return res.json({ success: false });
        }
    }

}