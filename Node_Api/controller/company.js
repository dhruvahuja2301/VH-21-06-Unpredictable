const { Company } = require('../model/company');
const {genSaltSync, hashSync} = require('bcrypt')

const hashPassword = function (password) {
    const salt = genSaltSync(10);
    password = hashSync(password, salt);
    return password
}

module.exports.index = async (req, res)=>{
    const company = await Company.find({});    
    res.json(company);
} 

module.exports.createCompany = async(req, res)=>{
    try{
        // password bcrypt
        const comp = {
            name:req.body.name, 
            location:req.body.location, 
            password: hashPassword(req.body.password),     
            email:req.body.email, 
            phoneNumber:req.body.number 
        };
        if(req.body.website){
            comp.contact.website=req.body.website;
        }
        // console.log(comp)
        const newCompany = new Company(comp);
        await newCompany.save();
        // console.log(comp)
        // jwt session add user 
        res.status(201).json(null)
    }catch(err){
        res.status(500).json(err.message)
    }
}

module.exports.showCompany = async (req, res)=>{
    try{
        const comp = await Company.findById(req.params.id);   
        // console.log(Company);
        if(!comp){
            throw new Error("Company not found")
        }
        res.json(comp);
    } catch(err){
        res.status(500).json(err.message)
    }
}

module.exports.updateCompany = async(req, res)=>{
    try{
        const id = req.params.id;
        // password bcrypt
        const comp = {
            name:req.body.name, 
            location:req.body.location, 
            password: hashPassword(req.body.password),     
            email:req.body.email, 
            phoneNumber:req.body.number 
        };
        if(req.body.website){
            company.contact.website=req.body.website;
        }
        const newCompany = await Company.findByIdAndUpdate(id, comp);
        // jwt session add user 
        res.status(201).json(null)
    }catch(err){
        res.status(500).json(err.message)
    }
}

module.exports.deleteCompany = async(req, res)=>{
    try{
        const id = req.params.id;
        await Company.findByIdAndDelete(id);
        res.json(null)
    }catch(err){
        res.status(500).json(err.message)
    }
}