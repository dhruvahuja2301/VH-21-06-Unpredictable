const { Job } = require('../model/job');
const { Application} = require('../model/application');

module.exports.index = async (req, res)=>{
    const jobs = await Job.find();    
    res.json(jobs);
} 

module.exports.createJob = async(req, res)=>{
    try{
        const id = req.params.id;
        const { name, jobtype, vacancy, start, end, description } = req.body
        // const description = { pay: description.pay, duration: description.duration } 
        
        const job = { name, jobtype, vacancy, start, end, description };

        if(req.body.skill){
            job.description.skill=req.body.description.skill;
        }
        const newJob = new Job(job);
        newJob.company = id
        const newjob = await newJob.save();
        
        res.status(201).json(newjob)
    }catch(err){
        res.status(500).json(err.message)
    }
}

module.exports.showJob = async (req, res)=>{
    try{
        const job = await Job.findById(req.params.id);   
        // console.log(Company);
        if(!job){
            throw new Error("No jobs found")
        }
        res.json(job);
    } catch(err){
        res.status(500).json(err.message)
    }
}

module.exports.updateJob = async(req, res)=>{
    try{
        const id = req.params.id;
        const { name, jobtype, vacancy, start, end, description } = req.body
        // const description = { pay: description.pay, duration: description.duration } 
        
        const job = { name, jobtype, vacancy, start, end, description };

        if(req.body.skill){
            job.description.skill=req.body.description.skill;
        }
        const newJob = await Job.findByIdAndUpdate(id, job);
        // jwt session add user 
        res.status(201).json(null)
    }catch(err){
        res.status(500).json(err.message)
    }
}

module.exports.deleteJob = async(req, res)=>{
    try{
        const id = req.params.id;
        await Job.findByIdAndDelete(id);
        await Application.deleteMany({appliedTo:id})
        res.json(null)
    }catch(err){
        res.status(500).json(err.message)
    }
}