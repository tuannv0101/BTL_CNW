const express = require('express');
const userController = require('../controllers/user.controller');
const groupController = require('../controllers/group.controller');
const memberController = require('../controllers/member.controller');
const router = express.Router();
// user
router.get('/user', userController.getAll);
router.post('/login', userController.login);
// group
router.get('/group/:idUser', groupController.getAll);
router.post('/group/add', groupController.add);

// member
router.post('/member/add', memberController.add)
router.post('/member/delete', memberController.delete)

module.exports = router