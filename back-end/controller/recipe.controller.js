const connection = require('../db')

module.exports = {
    getAll: async (req, res) => {
        const { userId } = req.body
        return new Promise((resolve, reject) => {
            connection.query(`
                SELECT r.id, r.name, r.desc, 
                JSON_OBJECT('id', f.id, 'name', f.name, 'unit', f.unit, 'createdByAdmin', f.createdByAdmin, 'image', f.image, 'type', f.type, 'isDeleted', f.isDeleted) AS 'food',
                CONCAT('[', GROUP_CONCAT(
                    JSON_OBJECT('id', m.id, 'name', m.name, 'unit', m.unit, 'createdByAdmin', m.createdByAdmin, 'image', m.image, 'type', m.type, 'isDeleted', m.isDeleted, 'quantity', rm.quantity)
                ), ']') AS 'materials'
                FROM Recipe r
                JOIN Food f ON r.idFood = f.id
                JOIN RecipeMaterial rm ON rm.idRecipe = r.id
                JOIN Food m ON rm.idMaterial = m.id
                WHERE r.idUser = ?
                GROUP BY r.id;
            `, [userId],
                (error, results, fields) => {
                    if (error) {
                        console.error('Error get food: ', error);
                        reject(error);
                    } else {
                        const data = results.map(item => {
                            return {
                                ...item,
                                food: JSON.parse(item.food),
                                materials: JSON.parse(item.materials)
                            }
                        })
                        return res.json({ success: true, data })
                    }
                }
            )
        })
    },
    add: async (req, res) => {
        const { name, desc, idUser, idFood, materials } = req.body

        try {
            const recipeQuery = `INSERT INTO recipe (name, \`desc\`, idFood, idUser) VALUES (?, ?, ?, ?)`
            const selectQuery = `
                SELECT MAX(ID) as id FROM recipe;
            `;
            const recipe = await new Promise((resolve, reject) => {
                connection.query(recipeQuery, [name, desc, idFood, idUser],
                    (error, results, fields) => {
                        if (error) {
                            console.error(`Error inserting recipe: `, error);
                            reject(error);
                        } else {
                            resolve(results);
                        }
                    })
            })
            const recipeId = await new Promise((resolve, reject) => {
                connection.query(selectQuery,
                    (error, results, fields) => {
                        if (error) {
                            console.error(`Error get recipe id: `, error);
                            reject(error);
                        } else {
                            resolve(results);
                        }
                    })
            })

            const recipeMaterialQuery = `INSERT INTO recipematerial (idMaterial, idRecipe, quantity) VALUES (?, ?, ?)`
            for (let i = 0; i < materials.length; ++i) {
                await new Promise((resolve, reject) => {
                    connection.query(recipeMaterialQuery, [materials[i].id, recipeId[0].id, materials[i].quantity],
                        (error, results, fields) => {
                            if (error) {
                                console.error(`Error insert recipe material: `, error);
                                reject(error);
                            } else {
                                resolve(results);
                            }
                        })
                })
            }


            return res.json({ success: true })
        } catch (error) {
            console.error('Error', error.message);
            return res.json({ success: false, message: 'Error' })
        }
    }
}