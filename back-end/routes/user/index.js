const express = require('express')
const userController = require('../../controllers/user.controller')
const router = express.Router()

const verifyToken = require('../../middlewares/checkAuth')

router.get("/checkUser", verifyToken, userController.checkUser)
router.post("/login", userController.login)
router.post("/register", userController.register)

module.exports = router
