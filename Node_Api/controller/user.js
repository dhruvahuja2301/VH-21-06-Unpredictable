const { User } = require('../model/user');
const {genSaltSync, hashSync} = require('bcrypt')
const { Application } = require('../model/application');
const { Portfolio } = require('../model/portfolio');

const hashPassword = function (password) {
    const salt = genSaltSync(10);
    password = hashSync(password, salt);
    return password
}

module.exports.index = async (req, res)=>{
    const users = await User.find({});    
    res.json(users);
} 

module.exports.createUser = async(req, res)=>{
    try{
        // password bcrypt
        const user = {
            name:{
                first:req.body.first,
                last:req.body.last
            },  
            password: hashPassword(req.body.password),     
            email:req.body.email, 
            phoneNumber:req.body.number 
        };
        // console.log(user)
        const newUser = new User(user);
        const newuser = await newUser.save();
        // console.log(user)
        // jwt session add user 
        res.status(201).json(newuser)
    }catch(err){
        res.status(500).json(err.message)
    }
}

module.exports.showUser = async (req, res)=>{
    try{
        const user = await User.findById(req.params.id);   
        // console.log(user);
        if(!user){
            throw new Error("User not found")
        }
        res.json(user);
    } catch(err){
        res.status(500).json(err.message)
    }
}

module.exports.updateUser = async(req, res)=>{
    try{
        const id = req.params.id;
        // password bcrypt
        const user = {
            name:{
                first:req.body.first,
                last:req.body.last
            },  
            password: hashPassword(req.body.password),     
            email:req.body.email, 
            phoneNumber:req.body.number 
        };
        // console.log(user)
        const newUser = await User.findByIdAndUpdate(id, user,{new:true});
        // jwt session add user 
        res.status(201).json(newUser)
    }catch(err){
        res.status(500).json(err.message)
    }
}

module.exports.deleteUser = async(req, res)=>{
    try{
        const id = req.params.id;
        const del = await User.findById(id);
        await Portfolio.findByIdAndDelete(del.portfolio);
        await Application.deleteMany({appliedBy: del._id}) 
        await User.findByIdAndDelete(id);
        res.json(del)
    }catch(err){
        res.status(500).json(err.message)
    }
}