const express = require('express');
const userController = require('../controllers/user.controller');
const groupController = require('../controllers/group.controller');
const memberController = require('../controllers/member.controller');
const foodController = require('../controllers/food.controller');
const marketController = require('../controllers/market.controller');
const recipeController = require('../controllers/recipe.controller');

const cookController = require('../controllers/cook.controller');
const foodController = require('../controllers/food.controller')

const storeController = require('../controllers/store.controller');


const router = express.Router();

// user
router.get('/user', userController.getAll);
router.post('/login', userController.login);

// group
router.get('/group/:idUser', groupController.getAll);
router.post('/group/add', groupController.add);
router.get('/group/market-share/:idGroup', groupController.getShareMarket);
router.post('/group/market-share/add', groupController.addShare);

// member
router.post('/member/add', memberController.add)
router.post('/member/delete', memberController.delete)

// food
router.post('/food', foodController.getAll);
router.post('/food/add', foodController.add);
router.get('/food/delete/:idFood', foodController.delete);

// market
router.get('/market/:idUser', marketController.getAll);
router.post('/market/add', marketController.add);
router.post('/market/buy', marketController.buy);

// recipe
router.post('/recipe', recipeController.getAll)
router.post('/recipe/add', recipeController.add)


// cook
router.get('/cook/:idUser', cookController.getAll)
router.post('/cook/add', cookController.add)
router.get('/cook/delete/:id', cookController.delete)

// store
router.get('/store/:idUser', storeController.getAll)
router.get('/store/delete/:id', storeController.delete)



module.exports = router