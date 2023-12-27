const connection = require('../db')

module.exports = {
    getAll: async (req, res) => {
        const idUser = req.params.idUser
        try {
            const query = `
                            SELECT Market.id, Market.dateToBuy, Market.dateBought, Market.state, Market.quantity,
                                Food.id AS food_id, Food.name AS food_name, Food.unit AS food_unit, Food.image AS food_image, Food.type AS food_type,
                                User.id AS user_id, User.username AS user_username, User.name AS user_name,
                                UserBought.id AS user_bought_id, UserBought.username AS user_bought_username, UserBought.name AS user_bought_name
                            FROM Market
                            JOIN Food ON Market.idFood = Food.id
                            JOIN User ON Market.idUser = User.id
                            LEFT JOIN User AS UserBought ON Market.idUserBought = UserBought.id
                            WHERE Market.idUser = ?;
                        `
            const rows = await new Promise((resolve, reject) => {
                connection.query(query, [idUser], (error, results) => {
                    if (error) {
                        console.error('Error getting market: ', error);
                        reject(error);
                    } else {
                        resolve(results);
                    }
                });
            });

            const data = rows.map(row => ({
                id: row.id,
                user: {
                    id: row.user_id,
                    username: row.user_username,
                    name: row.user_name
                },
                dateToBuy: row.dateToBuy,
                dateBought: row.dateBought,
                userBought: {
                    id: row.user_bought_id,
                    username: row.user_bought_username,
                    name: row.user_bought_name
                },
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
    add: async (req, res) => {
        const { idUser, dateToBuy, quantity, idFood } = req.body
        const query = `INSERT INTO market (idUser, dateToBuy, state, quantity, idFood) VALUES (?, ?, 0, ?, ?)`
        const data = await new Promise((resolve, reject) => {
            connection.query(query, [idUser, dateToBuy, quantity, idFood],
                (error, results, fields) => {
                    if (error) {
                        console.error(`Error inserting market: `, error);
                        reject(error);
                    } else {
                        resolve(results);
                    }
                }
            );
        })
        return res.json({ success: true, message: "Add thành công" })
    },

    buy: async (req, res) => {
        const { idUserBought, dateBought, idMarket, quantity, expire, state } = req.body
        try {
            const marketQuery = `
                                    UPDATE market
                                    SET idUserBought = ?, dateBought = ?, state = 1
                                    WHERE id = ?;
                                `;

            const selectQuery = `
                SELECT idUser FROM market WHERE id = ?;
            `;

            const market = await new Promise((resolve, reject) => {
                connection.beginTransaction((err) => {
                    if (err) {
                        console.error(`Error: `, err);
                        reject(err);
                    }
                    connection.query(
                        marketQuery,
                        [idUserBought, dateBought, idMarket],
                        (error, results, fields) => {
                            if (error) {
                                console.error(`Error: `, error);
                                connection.rollback(() => {
                                    reject(error);
                                });
                            } else {
                                connection.query(selectQuery, [idMarket], (err, result, fields) => {
                                    if (err) {
                                        console.error(`Error: `, err);
                                        connection.rollback(() => {
                                            reject(err);
                                        });
                                    } else {
                                        connection.commit((err) => {
                                            if (err) {
                                                console.error(`Error: `, err);
                                                connection.rollback(() => {
                                                    reject(err);
                                                });
                                            }
                                            resolve([results, result]);
                                        });
                                    }
                                });
                            }
                        }
                    );
                });
            });

            const storeQuery = `
                INSERT INTO store (idUser, idMarket, expire, quantity, state)
                VALUES (?, ?, ?, ?, ?)
            `;
            const store = await new Promise((resolve, reject) => {
                connection.query(
                    storeQuery,
                    [market[1][0].idUser, idMarket, expire, quantity, state],
                    (error, results, fields) => {
                        if (error) {
                            console.error(`Error: `, error);
                            reject(error);
                        } else {
                            resolve(results);
                        }
                    }
                );
            });

            return res.json({ success: true, message: "Add thành công" })
        } catch (error) {
            console.error('Error: ', error.message);
            return res.json({ success: false })
        }
    }
}