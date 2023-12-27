const express = require('express');
const userController = require('../controllers/user.controller');
<<<<<<< HEAD
=======
const groupController = require('../controllers/group.controller');
const memberController = require('../controllers/member.controller');
>>>>>>> ae30fe7449877f7fbe7eb3b1d68b5e931a5dafdf
const router = express.Router();

// user
router.get('/user', userController.getAll);
<<<<<<< HEAD
router.post('/login', userController.login);
=======
router.post('/login', userController.login);

// group
router.get('/group/:idUser', groupController.getAll);
router.post('/group/add', groupController.add);

// member
router.post('/member/add', memberController.add)
router.post('/member/delete', memberController.delete)
module.exports = router
>>>>>>> ae30fe7449877f7fbe7eb3b1d68b5e931a5dafdf
