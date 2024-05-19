const jwt = require('jsonwebtoken')
const CustomAPIError = require('../error/error')

const verifyToken = async (req, res, next)=>{
    const access_token = req.cookies.access_token
    if(!access_token)
    throw new CustomAPIError('Authorization token missing', 401)

    const payload = jwt.verify(access_token, process.env.JWT_SECRET)
    req.user = payload
    next()
}

const verifyUser = async (req, res, next)=>{
    const {id:userId} = req.params
    const {id, isAdmin} = req.user

    if(id===userId || isAdmin)
    return next()
    
    throw new CustomAPIError('Unauthorized',401)

}

const verifyAdmin = async (req, res, next)=>{

    const {isAdmin} = req.user

    if(isAdmin)
    return next()

    throw new CustomAPIError('Unauthorized',401)

}
module.exports ={ verifyToken, verifyUser, verifyAdmin}