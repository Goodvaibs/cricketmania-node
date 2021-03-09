const mongoose = require('mongoose');


const teamSchema = mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    team_username: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    is_active: {
        type:Boolean,
        default: true
    },
    team_logo: {
        type:String
    },
    team_photo: {
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

module.exports = mongoose.model('Team', teamSchema);