const User = require('../model/User')
const CustomAPIError = require('../error/error')

const register = async(req, res)=>{

    const user = await User.create(req.body)
    res.status(201).json({data: user})
    
} 

const login = async(req, res)=>{

    const {username, password} = req.body
    const user = await User.findOne({username})
    
    if(!user)
    throw new CustomAPIError('Username not exists', 401)

    const result = await user.verifyPassword(password)
    if(result===false)
    throw new CustomAPIError('Password not match', 401)

    const token = user.createJWT()
    const {password:hPass, isAdmin, ...otherDetails} = user._doc

    res.cookie("access_token", token, {
        httpOnly: true
    }).status(200).json({data:otherDetails, isAdmin})

}



module.exports = {
    register,
    login
}