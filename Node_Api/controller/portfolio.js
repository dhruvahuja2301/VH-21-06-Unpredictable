const { Portfolio } = require('../model/portfolio');

const { User } = require('../model/user');

module.exports.createPortfolio = async(req, res)=>{
    try{
        // password bcrypt
        const user = await User.findById(req.params.id);
        const port = {
            education: req.body.education,  
            experience: req.body.experience,     
            project: req.body.project, 
            skill: req.body.skill,
            certificate: req.body.certificate
        };
        const newPortfolio = new Portfolio(port);
        // console.log(user)
        newport = await newPortfolio.save();
        // console.log(user)
        user.portfolio = newport._id
        await user.save();
        // jwt session add user 
        res.status(201).json(newport)
    }catch(err){
        res.status(500).json(err.message)
    }
}

module.exports.showPortfolio = async (req, res)=>{
    try{
        const port = await Portfolio.findById(req.params.id);   
        // console.log(user);
        if(!port){
            throw new Error("Portfolio not found")
        }
        res.json(port);
    } catch(err){
        res.status(500).json(err.message)
    }
}

module.exports.updatePortfolio = async(req, res)=>{
    try{
        const id = req.params.id;
        // password bcrypt
        const port = {
            education: req.body.education,  
            experience: req.body.experience,     
            project: req.body.project, 
            skill: req.body.skill,
            certificate: req.body.certificate
        };
        const newPort = await Portfolio.findByIdAndUpdate(id, port, {new:true});
        // console.log(port)
        // const newUser = await User.findByIdAndUpdate(id, user);
        // jwt session add user 
        res.status(201).json(newPort)
    }catch(err){
        res.status(500).json(err.message)
    }
}
