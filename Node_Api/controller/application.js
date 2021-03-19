const { Application } = require('../model/application');
const { Job } = require('../model/job');

module.exports.submitApplication = async(req, res)=>{
    try{
        const application = { appliedBy: req.params.applicantId, appliedTo:req.params.jobId };

        const newApplication = new Application(application);
        const newapp = await newApplication.save();
        
        res.status(201).json(newapp)
    }catch(err){
        res.status(500).json(err.message)
    }
}

module.exports.showApplication = async (req, res)=>{
    try{
        const applications = await Application.findById(req.params.id);    
        // console.log(Company);
        if(!applications){
            throw new Error("No application recieved.")
        }
        res.json(applications);
    } catch(err){
        res.status(500).json(err.message)
    }
}

module.exports.updateStatus = async(req, res)=>{
    try{
        const app = await Application.findById(req.params.id)
        if(app.status==='ACCEPTED' || app.status==="REJECTED"){
            throw new Error("cannot change status")
        }
        const updatedApplication = await Application.updateOne({_id:req.params.id}, {status: req.body.status});
        if(req.body.status==='ACCEPTED') {
        await Job.updateOne({_id: req.params.appliedTo},{$inc: {
            vacancy: -1
        }})
    }
        // jwt session add user 
        res.status(201).json(updatedApplication)
    }catch(err){
        res.status(500).json(err.message)
    }
}

module.exports.removeApplication = async(req, res)=>{
    try{
        const app = await Application.findById(req.params.id)
        if(app.status==='PENDING') {
            await Application.findByIdAndDelete(req.params.id);
        }
        else {
            throw new Error('Unable to remove application')
        }
        res.json(null)
    }catch(err){
        res.status(500).json(err.message)
    }
}