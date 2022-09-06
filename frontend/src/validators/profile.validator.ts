import Joi from "joi";

import {regEx} from "./regEx";
import {errorMessage} from "../constants";

const ProfileValidator = Joi.object({
    name: Joi.string().regex(regEx.name.pattern).required().messages({
        'string.pattern.base': regEx.name.msg,
        'string.empty': errorMessage.empty
    }),
    surname: Joi.string().regex(regEx.name.pattern).required().messages({
        'string.pattern.base': regEx.name.msg,
        'string.empty': errorMessage.empty
    }),
    age: Joi.number().min(6).max(100).required().messages({
        'number.base': 'age must be a number',
        'number.empty': errorMessage.empty,
        'number.min': 'min 6',
        'number.max': 'max 100',
    }),
    phone: Joi.string().regex(regEx.phone.pattern).required().messages({
        'string.pattern.base': regEx.phone.msg,
        'string.empty': errorMessage.empty
    })
});

export {ProfileValidator}