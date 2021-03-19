const { Schema, model } = require('mongoose')
// {
//     "name":"abcd","jobtype":"abce","vacancy":7,"start":"2020/03/05","end":"2020/03/11","description":{"skills":["HTML","CSS"],"duration":"1 month","pay":{"amount":"Rs4000","pay_freq":"Month"}}
// }
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
    collection: 'job'
})

const Job = new model('job', jobSchema);

module.exports = { Job }