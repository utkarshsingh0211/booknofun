const User = require('../model/User')
const CustomAPIError = require('../error/error')

const getUser = async (req, res)=>{
    const user = await User.findById(req.params.id)
    res.status(201).json({data:user})
}

const getUsers = async (req, res)=>{
    const users = await User.find({})
    res.status(200).json({data:users})
}

const updateUser = async (req, res)=>{

    const tempUser = await User.findById(req.params.id)
    const isUserAdmin = tempUser.isAdmin

    if(req.body.isAdmin && !isUserAdmin)
    throw new CustomAPIError('Admin can be only be made by an admin', 401)

    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        runValidators: true,
        new: true
    })
    res.status(200).json({data:user})
}

const deleteUser = async (req, res)=>{
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json({msg:'User deleted'})
}

module.exports = {
    getUser,
    getUsers,
    updateUser,
    deleteUser
}