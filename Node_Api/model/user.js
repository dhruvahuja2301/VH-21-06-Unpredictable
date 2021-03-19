const {isEmail} = require('validator')
const { Schema, model } = require('mongoose');
const {genSaltSync, hashSync, compare} = require('bcrypt')

const userSchema = new Schema({
    name: {
        type: {
            first: {
                type: String,
                required: true
            },
            last: {
                type:String,
                required: true
            }
        },
        required: true
    },
    password: {
        type: String,
        required: true
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
    portfolio: {
        type: Schema.Types.ObjectId,
        ref: 'portfolio'
    },
},{
    timestamps:{
        createdAt: true,
        updatedAt: false
    },
    collection: 'user'
})

userSchema.pre('save', function (next){
    const salt = genSaltSync(10);
    this.password = hashSync(this.password, salt);
    next();
});

//statics method to login user
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({email});
    if(user){
        const auth = await compare(password,user.password);
        if(auth){
            return user;
        }
        throw Error("Incorrect Email or password");
    }
    throw Error("Incorrect Email or password");
}

const User = new model('user', userSchema);

module.exports = { User }