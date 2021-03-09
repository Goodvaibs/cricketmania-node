const mongoose = require('mongoose');


const PlayerSchema = mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    is_batsman: {
        type:Boolean,
        required:true
    },
    is_bowler: {
        type:Boolean,
        required:true
    },
    is_allrounder: {
        type:Boolean,
        required:true
    },
    is_wicketkeeper: {
        type:Boolean,
        required:true
    },
    profile_photo: {
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

module.exports = mongoose.model('Player', PlayerSchema);