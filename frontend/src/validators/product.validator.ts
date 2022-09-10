import Joi from "joi";

import {regEx} from "./regEx";
import {errorMessage} from "../constants";

const productValidator = Joi.object({
    title: Joi.string().max(100).required().messages({
        'string.max': 'max 100 ch',
        'string.empty': errorMessage.empty
    }),
    description: Joi.string().max(500).allow('').messages({
        'string.max': 'max 500 ch',
    }),
    price: Joi.number().min(1).required().messages({
        'number.base': 'age must be',
        'number.min': 'can\'t be less than 1',
        'number.empty': errorMessage.empty
    }),
    color: Joi.string().regex(regEx.color.pattern).required().messages({
        'string.pattern.base': regEx.color.msg,
        'string.empty': errorMessage.empty
    }),
    size: Joi.string().required().messages({
        'string.empty': errorMessage.empty
    }),
    gender: Joi.string().required().messages({
        'string.empty': errorMessage.empty
    }),
    brand: Joi.any(),
    category: Joi.any(),
    images: Joi.any()
});

export {productValidator}