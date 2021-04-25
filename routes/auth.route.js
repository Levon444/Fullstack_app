const {Router} = require('express')
const User = require('../models/User_model')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require ("config")
const router = Router();
// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Некорректный пароль').isLength(options = {min: 6}),
    ], 
    async(req,res)=>{
try{
    const errors= validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные'
            })
    }
const {email, password} = req.body;
const new_usr = await User.findOne({email})
if(new_usr){
    res.status(400).json({message: 'Даный почтовый адрес зарегистрирован'})
}
const hashed = bcrypt.hash(password, odithodtb)
const user = new User({email, password: hashed})
await user.save()
res.status(201).json({message: 'Пользователь зарегистрирован'})

}catch(e){
res.status(500).json({message: 'Что-то пошло не так'})
}
})
// /api/auth/login
router.post(
    '/login', 
    
    [
        check('email', 'Некорректный email').normalizeEmail().isEmail(),
        check('password', 'Некорректный пароль').exists(),
    ], 
    async(req,res)=>{
try{
    const errors= validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные'
            })
    }
const {email, password} = req.body
const user = await User.findOne({email})
if (!user) {
    return res.status(400).json({message: 'Пользователь не найден'})
}
const isMatch = await bcript.compare(password, user.password)
if (isMatch){
    return res.status(400).json({message: 'Пользователь не найден'})
}
const token =jwt.sign(
    {userId: user.id},
    config.get('jwtkey'),
    {expirceIn: '1h'}
)
res.json({token, userId: user.id})
}catch(e){
res.status(500).json({message: 'Что-то пошло не так'})
}
    
}) 
module.exports = router