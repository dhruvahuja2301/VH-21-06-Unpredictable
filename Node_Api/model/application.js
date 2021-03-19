const { Schema, model } = require('mongoose')

const applicationSchema = new Schema({
    appliedBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    appliedTo: {
        type: Schema.Types.ObjectId,
        ref: 'job',
        required: true
    },
    status: {
        type: String,
        enum: ['PENDING', 'ACCEPTED', 'REJECTED'],
        default: 'PENDING'
    }
},{
    timestamps:{
        createdAt: 'appliedAt',
        updatedAt: false
    },
    collection: 'application'
})

const Application = new model('application', applicationSchema);

module.exports = { Application }