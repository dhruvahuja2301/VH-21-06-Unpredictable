const {model, Schema } = require('mongoose')

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
})


const performanceSchema = new Schema({
	performanceScale:{
		type: String,
		enum: ['percentage','cgpa(/10)','cgpa(/4)'],
		required: true
	}
},
{
	discriminatorKey: 'performanceScale'
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
            }
        ],
        required: true
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
        }],
        required: true
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
        }],
        required: true
    },
    skills: {
        type: [{
                type:String,
                required: true
            }]
    },
    certificates: {
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
        }],
        required: true
    }
})

portfolioSchema.path('education').path('performance').discriminator('percentage', new Schema({
	value: {
		type: Number,
		min:0,
		max:100
	}
}))

portfolioSchema.path('education').path('performance').discriminator('cgpa(/10)', new Schema({
	value: {
		type: Number,
		min:0,
		max:10
	}
}))

portfolioSchema.path('education').path('performance').discriminator('cgpa(/4)', new Schema({
	value: {
		type: Number,
		min:0,
		max:4
	}
}))