const { boolean } = require('@hapi/joi');
const mongoose = require('mongoose');


const subHeaderSchema = mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    is_parent: {
        type:Boolean,
        default: true
    },
    parent_id: {
        type:String
    },
    is_active: {
        type:String,
        default: true
    },
    created_by: {
        type:String
    },
    updated_by: {
        type:String
    },
    created_at: {
        type:Date,
        default: Date.now()
    },
    updated_at: {
        type:Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('SubHeader', subHeaderSchema);