const Joi = require('@hapi/joi');



//Player joining validation
const playerValidation = data => {
    const schema = {
        name: Joi.string()
                .min(6)
                .required(),
        password: Joi.required(),
        is_batsman: Joi.boolean(),
        is_bowler:Joi.boolean(),
        is_allrounder:Joi.boolean(),
        is_wicketkeeper:Joi.boolean()
    };

    return Joi.validate(data, schema);
};


//Player login validation
const playerLoginValidation = data => {
    const schema = {
        name: Joi.required(),
        password: Joi.required()
    };

    return Joi.validate(data, schema);
};


//Team validation
const teamValidation = data => {
    const schema = {
        name: Joi.string()
                .min(6)
                .required(),
        team_username: Joi.string()
                            .min(6)
                            .required(),
        password: Joi.required(),
        is_active: Joi.boolean()
    };

    return Joi.validate(data, schema);
};

//News validation
const newsValidation = data => {
    const schema = {
        title: Joi.string()
                .min(6)
                .required(),
        title_image: Joi.required(),
        body: Joi.required(),
        is_active: Joi.boolean()
    };

    return Joi.validate(data, schema);
};

//Sub headers validation
const subHeaderValidation = data => {
    const schema = {
        name: Joi.string()
                .min(6)
                .required(),
        is_parent: Joi.required(),
        parent_id: Joi.string(),
        is_active: Joi.boolean()
    };

    return Joi.validate(data, schema);
};


module.exports.playerValidation = playerValidation;
module.exports.playerLoginValidation = playerLoginValidation;
module.exports.teamValidation = teamValidation;
module.exports.newsValidation = newsValidation;
module.exports.subHeaderValidation = subHeaderValidation;

