const {model, Schema } = require('mongoose')
// {
//     "education":[{"start":{"month":"Apr","year":2003},"end":{"month":"Mar","year":2016},"collegeName":"ris malad","performance":{"performanceScale":"percentage","value":90}}, {"start":{"month":"Jun","year":2016},"end":{"month":"Jun","year":2018},"collegeName":"pace college","performance":{"performanceScale":"percentage","value":74}},{"start":{"month":"Aug","year":2018},"end":{"month":"May","year":2022},"collegeName":"tsec","performance":{"performanceScale":"cgpa(/10)","value":9.19}}],
//     "experience": [{"start":{"month":"Jul","year":2020},"end":{"month":"Aug","year":2020},"companyName":"kohli media"},{"start":{"month":"Dec","year":2019},"end":{"month":"Feb","year":2020},"companyName":"mta intro js"}],
//     "project": [{"start":{"month":"Jul","year":2020},"end":{"month":"Aug","year":2020},"name":"kohli media"},{"start":{"month":"Dec","year":2019},"end":{"month":"Feb","year":2020},"name":"mta intro js"}],
//     "skill": ["HTML","CSS","JS"],
//     "certificate":[{"start":{"month":"Jul","year":2020},"end":{"month":"Aug","year":2020},"name":"kohli media"},{"start":{"month":"Dec","year":2019},"end":{"month":"Feb","year":2020},"name":"mta intro js"}]
// }
const dateSchema = new Schema({
    month: {
        type: String,
        enum: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        required: true
    },
    year: {
        type: Number,
        min: 1950,
        max: 2050
    }
},{
    _id:false
})



const performanceSchema = new Schema({
	performanceScale:{
		type: String,
		enum: ['percentage','cgpa(/10)','cgpa(/4)'],
		required: true
	}
},
{
	discriminatorKey: 'performanceScale',
    _id:false
})

const portfolioSchema = new Schema({
    education: {
        type: [
            {
                start: {
                    type: dateSchema,
                    required: true
                },
                end: {
                    type: dateSchema,
                    required: true
                },
                collegeName: {
                    type: String,
                    required: true
                },
                performance: {
                    type: performanceSchema,
                    required: true
                }
            },            
        ]
    },
    experience: {
        type: [{
            start: {
                type: dateSchema,
                required: true
            },
            end: {
                type: dateSchema,
                required: true
            },
            companyName: {
                type: String,
                required: true
            }
        }]
    },
    project: {
        type: [{
            start: {
                type: dateSchema,
                required: true
            },
            end: {
                type: dateSchema,
                required: true
            },
            name: {
                type: String,
                required: true
            },
        }]
    },
    skill: {
        type: [{
                type:String,
                required: true
            }]
    },
    certificate: {
        type: [{
            start: {
                type: dateSchema,
                required: true
            },
            end: {
                type: dateSchema,
                required: true
            },
            name: {
                type: String,
                required: true
            },
        }]
    }
},{
    collection: 'portfolio'         
})

portfolioSchema.path('education.performance').discriminator('percentage', new Schema({
	value: {
		type: Number,
		min:0,
		max:100
	}
}))

portfolioSchema.path('education.performance').discriminator('cgpa(/10)', new Schema({
	value: {
		type: Number,
		min:0,
		max:10
	}
}))

portfolioSchema.path('education.performance').discriminator('cgpa(/4)', new Schema({
	value: {
		type: Number,
		min:0,
		max:4
	}
}))

const Portfolio = new model('portfolio', portfolioSchema)
module.exports = { Portfolio }