const { verifyUser, verifyAdmin, verifyToken } = require('../middleware/auth')
const {
    getUser,
    getUsers, 
    updateUser,
    deleteUser
} = require('../controllers/user')

const userRouter = require('express').Router()

//  get all the users
userRouter.get('/', verifyAdmin, getUsers)

// RUD on users

userRouter.get('/:id',verifyToken, verifyUser, getUser)
userRouter.delete('/:id',verifyToken, verifyUser, deleteUser)
userRouter.patch('/:id',verifyToken, verifyUser, updateUser)

module.exports = userRouter