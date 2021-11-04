const User = require('../models/user');
const bcrypt = require('bcrypt');


// Register
const register = async(req, res, next) => {
    const {email, password} = req.body
    try{
        const checkEmail = await User.findOne({email: email});
        const hashedPassword = await bcrypt.hash(password, 10);
        if(checkEmail){
            throw new Error("email already exists !")
        }
        const user = new User({
            email: email,
            password: hashedPassword
        })
        await user.save()
        return res.json({
            message: 'Register successfully !',
            user: user.toJSON()
        });
    }catch(err){
        res.json(err.message)
    }   
}

// Login
const login = async(req, res, next) => {
    const {email, password} = req.body
    try{
        const user = await User.findOne({email: email});
        if(user && (await bcrypt.compare(password, user.password))) {

            return res.json({
                message: 'Login successfully !',
                user: user.toJSON()
            });
        }
        res.json('wrong password !');
    }catch(err){
        return res.json(err.message)
    }
}

// Authenticated
async function Authenticated(req, res, next){

}

module.exports = {
                register,
                login,
                Authenticated
                }