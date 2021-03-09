const mongoose = require('mongoose');


const newsSchema = mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    title_image: {
        type:String
    },
    body: {
        type:String
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

module.exports = mongoose.model('News', newsSchema);