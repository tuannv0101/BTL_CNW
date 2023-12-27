const connection = require('../db')

module.exports = {
    add: async (req, res) => {
        const { username, idGroup } = req.body;
        try {
            const userQuery = `SELECT * FROM user WHERE username = '${username}'`;
            const userIdResult = await new Promise((resolve, reject) => {
                connection.query(userQuery, (error, results) => {
                    if (error) {
                        console.error('Error getting user ID: ', error);
                        reject(error);
                    } else {
                        resolve(results[0]?.id);
                    }
                });
            });

            if (!userIdResult) {
                console.error('Error adding member');
                return res.json({ success: false });
            }

            const memberQuery = `INSERT INTO Member (idUser, idGroup, isLeader) VALUES (${userIdResult}, ${idGroup}, 0)`;
            await new Promise((resolve, reject) => {
                connection.query(memberQuery, (error) => {
                    if (error) {
                        console.error('Error adding member: ', error);
                        reject(error);
                    } else {
                        resolve();
                    }
                });
            });

            return res.json({ success: true });
        } catch (error) {
            console.error('Error adding member: ', error);
            return res.json({ success: false });
        }
    },
    delete: async (req, res) => {
        const { idUser, idGroup } = req.body
        try {
            const query = `DELETE FROM member WHERE idUser = ${idUser} AND idGroup = ${idGroup}`
            await new Promise((resolve, reject) => {
                connection.query(query, (error) => {
                    if (error) {
                        console.error('Error delete member: ', error);
                        reject(error);
                    } else {
                        resolve();
                    }
                });
            });
            return res.json({ success: true });
        } catch (error) {
            console.error('Error delete member: ', error);
            return res.json({ success: false });
        }
    }
}