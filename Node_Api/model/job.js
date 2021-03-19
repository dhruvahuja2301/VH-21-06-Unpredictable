const { Schema, model } = require('mongoose')

const jobSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    jobtype: {
        type: String,
        trim: true,
        required: true
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: 'company',
        required: true
    },
    vacancy: {
        type: Number,
        required: true
    },
    start: {
        type: Date,
        default: Date.now()
    },
    end: {
        type: Date,
        required: true
    },
    description: {
        type: {
            skills: [String],
            pay: {
                type: {
                    amount: {
                        type: String,
                        required: true
                    },
                    pay_freq: {
                        type: String,
                        enum: ['Week','Month','Year'],
                        required: true
                    }
                },
                required: true 
            },    
            duration:{
                type: String,
                required: true
            } 
        }
    }
}, {
    collection: 'Job'
})

const Job = new model('job', jobSchema);

module.exports = { Job }