const connection = require('../db')

module.exports = {
    getAll: async (req, res) => {
        try {
            const idUser = req.params.idUser
            const query = `
                            SELECT s.id, s.expire, s.state, s.quantity, f.id AS food_id, f.name AS food_name, f.unit AS food_unit, f.image AS food_image, f.type AS food_type
                            FROM Store AS s
                            JOIN Market AS m ON m.id = s.idMarket
                            JOIN Food AS f ON f.id = m.idFood
                            WHERE s.idUser = ?
                            `
            const rows = await new Promise((resolve, reject) => {
                connection.query(query, [idUser], (error, results) => {
                    if (error) {
                        console.error('Error getting store: ', error);
                        reject(error);
                    } else {
                        resolve(results);
                    }
                });
            });
            const data = rows.map(row => ({
                id: row.id,
                expire: row.expire,
                state: row.state,
                quantity: row.quantity,
                food: {
                    id: row.food_id,
                    name: row.food_name,
                    unit: row.food_unit,
                    image: row.food_image,
                    type: row.food_type
                }
            }))

            return res.json({ success: true, data })
        } catch (error) {
            console.error('Error: ', error);
            return res.json({ success: false });
        }
    },
    delete: async (req, res) => {
        const { id } = req.params;
        try {
            const query = `DELETE FROM store WHERE id = ${id}`;
            await new Promise((resolve, reject) => {
                connection.query(query, (error) => {
                    if (error) {
                        console.error('Error deleting store: ', error);
                        reject(error);
                    } else {
                        resolve();
                    }
                });
            });
            return res.json({ success: true });
        } catch (error) {
            console.error('Error deleting store: ', error);
            return res.json({ success: false });
        }
    }
}