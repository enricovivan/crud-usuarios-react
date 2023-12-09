
const express = require('express')

const router = express.Router()
const userController = require('../controller/userController')

router.get('/', userController.findAllUsers)
router.get('/:id', userController.findUserByID)
router.post('/login', userController.loginUser)
router.post('/save', userController.saveUser)
router.patch('/update/:id', userController.updateUser)
router.delete('/delete/:id', userController.deleteUser)

module.exports = router