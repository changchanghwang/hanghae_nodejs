const Joi = require('joi');

const joiSchema = {
    Joi,
    loginSchema: Joi.object({
        userId: Joi.string().min(1).required(),
        pw: Joi.string().min(1).required(),
    }),
    signupSchema: Joi.object({
        userId: Joi.string()
            .required()
            .min(3)
            .pattern(/^[a-zA-Z0-9가-힣]{3,}$/),
        pw: Joi.string()
            .required()
            .min(4)
            .pattern(/^[a-zA-Z0-9]{4,}$/),
        pwCheck: Joi.string()
            .required()
            .min(4)
            .pattern(/^[a-zA-Z0-9]{4,}$/),
    }),
    commentSchema: Joi.object({
        commentId: Joi.number().min(1),
        cardId: Joi.number().min(1),
        comment: Joi.string().required(),
        commentDepth: Joi.number().default(0),
    }),
    cardSchema: Joi.object({
        title: Joi.string().min(1).required(),
        desc: Joi.string().min(1).required(),
        pw: Joi.string().min(1).required(),
    }),
    likeSchema: Joi.object({
        cardId: Joi.string().min(1).required(),
    }),
};

module.exports = joiSchema;
