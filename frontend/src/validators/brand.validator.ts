import Joi from "joi";

const BrandValidator = Joi.object({
    name: Joi.string().required().min(2).max(50),
    description: Joi.string().max(255).empty().allow(''),
    image: Joi.any().empty(true)
});

export {BrandValidator}