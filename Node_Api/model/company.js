const {isEmail} = require('validator')
const { Schema, model } =  require('mongoose');
const {genSaltSync, hashSync, compare} = require('bcrypt')

const pointSchema = new Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
})

const companySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    website: {
        type: String
    },
    email: {
        type: String,
        validate:[isEmail
            // (val)=>{return true or false by matching val to regex}
            ,'Please enter valid email'],
        required: true
    },
    phoneNumber: {
                // type: Number,
                // min : 600000000,
                // max : 999999999
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    }
},{
    collection: 'company'         
})

companySchema.pre('save', function (next){
    const salt = genSaltSync(10);
    this.password = hashSync(this.password, salt);
    next();
});

const Company = new model('company', companySchema)
module.exports = { Company }