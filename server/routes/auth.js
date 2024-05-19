const authRouter = require('express').Router()
const {
    register,
    login
} = require('../controllers/auth')

authRouter.route('/login').post(login, (req, res)=>console.log(req.cookies))
authRouter.route('/register').post(register)

module.exports = authRouter