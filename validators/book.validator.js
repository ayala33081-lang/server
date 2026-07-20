import Joi from 'joi';

export const bookSchema = Joi.object({
    code: Joi.number().integer().required(),
    name: Joi.string().min(2).required(),
    category: Joi.string().required(),
    price: Joi.number().positive().required()
});