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
    }
}