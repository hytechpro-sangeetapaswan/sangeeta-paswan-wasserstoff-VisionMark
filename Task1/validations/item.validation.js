const Joi = require('joi');

// Validation schema for creating a new item
const createItemSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().positive().required(),
});

// Validation schema for updating an existing item
const updateItemById = Joi.object({
    id: Joi.string().required(),
    title: Joi.string(),
    description: Joi.string(),
    price: Joi.number().positive(),
});

module.exports = {
    createItemSchema, 
    updateItemById
};
