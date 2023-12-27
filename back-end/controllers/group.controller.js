const connection = require('../db')

module.exports = {
    getAll: async (req, res) => {
        const idUser = req.params.idUser
        return new Promise((resolve, reject) => {
            connection.query(`
                SELECT g.id, g.name, g.desc,
                CONCAT('[', GROUP_CONCAT(
                    CONCAT(
                        '{"id":', u.id, 
                        ',"username":"', u.username, 
                        '","name":"', u.name,
                        '","isLeader":', m.isLeader, 
                        '}'
                    )
                    SEPARATOR ','
                ), ']') AS members
                FROM \`group\` g
                LEFT JOIN \`member\` m ON g.id = m.idGroup
                LEFT JOIN \`user\` u ON m.idUser = u.id
                GROUP BY g.id, g.name, g.desc`
                , (error, results, fields) => {
                    if (error) {
                        console.error('Error getting group: ', error);
                        reject(error);
                    } else {
                        const preData = results.map(item => {
                            return {
                                ...item,
                                members: JSON.parse(item.members)
                            }
                        })
                        const data = preData.filter(item => item.members.map(i => i.id).includes(parseInt(idUser)))
                        return res.json({ success: true, data })
                    }
                });
        });
    },

    add: async (req, res) => {
        const { name, desc, idLeader } = req.body;
        try {
            const groupInsertResult = await new Promise((resolve, reject) => {
                connection.query(
                    'INSERT INTO `group` (name, `desc`) VALUES (?, ?)',
                    [name, desc],
                    (error, results, fields) => {
                        if (error) {
                            console.error('Error inserting group: ', error);
                            reject(error);
                        } else {
                            resolve(results);
                        }
                    }
                );
            });

            const groupId = groupInsertResult.insertId;

            await new Promise((resolve, reject) => {
                connection.query(
                    'INSERT INTO `member` (idUser, idGroup, isLeader) VALUES (?, ?, ?)',
                    [idLeader, groupId, 1],
                    (error, results, fields) => {
                        if (error) {
                            console.error(`Error inserting member with user ID ${userId} and group ID ${groupId}: `, error);
                            reject(error);
                        } else {
                            resolve(results);
                        }
                    }
                );
            });

            return res.json({ success: true, message: "Add thành công" })
        } catch (error) {
            console.error('Error adding group: ', error.message);
            return res.json({ success: false, message: 'Error adding group' })
        }
    },

    getShareMarket: async (req, res) => {
        const idGroup = req.params.idGroup
        try {
            const query = `
                            SELECT Market.id, Market.dateToBuy, Market.dateBought, Market.state, Market.quantity,
                                Food.id AS food_id, Food.name AS food_name, Food.unit AS food_unit, Food.image AS food_image, Food.type AS food_type,
                                User.id AS user_id, User.username AS user_username, User.name AS user_name,
                                UserBought.id AS user_bought_id, UserBought.username AS user_bought_username, UserBought.name AS user_bought_name
                            FROM Market
                            JOIN Food ON Market.idFood = Food.id
                            JOIN User ON Market.idUser = User.id
                            JOIN groupmarket ON Market.id = groupmarket.idMarket
                            LEFT JOIN User AS UserBought ON Market.idUserBought = UserBought.id
                            WHERE groupmarket.idGroup = ?;
                        `
            const rows = await new Promise((resolve, reject) => {
                connection.query(query, [idGroup], (error, results) => {
                    if (error) {
                        console.error('Error getting market share: ', error);
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

    addShare: async (req, res) => {
        const { idGroup, idMarket } = req.body
        const query = `INSERT INTO groupmarket (idGroup, idMarket) VALUES (?, ?)`
        try {
            await new Promise((resolve, reject) => {
                connection.query(query, [idGroup, idMarket],
                    (error, results, fields) => {
                        if (error) {
                            console.error('Error add share: ', error);
                            reject(error);
                        } else {
                            return res.json({ success: true })
                        }
                    }
                )
            })
        } catch (error) {
            return res.json({ success: false, message: 'Error adding share market' })
        }
    },
}