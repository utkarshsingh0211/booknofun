const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: [true, 'Username already exists']
    },
    email:{
        type: String,
        required: true,
        unique: [true, 'Email already in use']
    },
    country:{
        type: String,
        required: true
    },
    img:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        default: false
    }
}, {timestamps:true}
)

userSchema.pre('save', async function(){
    const salt = await bcryptjs.genSalt(10)
    this.password = await bcryptjs.hash(this.password, salt)
})

userSchema.methods.verifyPassword = async function (userPassword)
{
    const result = await bcryptjs.compare(userPassword, this.password)
    return result
}

userSchema.methods.createJWT = function (){
    const token = jwt.sign(
        {id: this._id, isAdmin: this.isAdmin},
        process.env.JWT_SECRET,
        {expiresIn:'30d'}
    )
    console.log(token)
    return token
}

module.exports = mongoose.model('User', userSchema)