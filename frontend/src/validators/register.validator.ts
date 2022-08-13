import Joi from "joi";

import {regEx} from "./regEx";
import {errorMessage} from "../constants";

const registerValidator = Joi.object({
    email: Joi.string().email({minDomainSegments: 2, tlds: {allow: false}}).required().messages({
        'string.empty': errorMessage.empty,
        'string.email': regEx.email.msg
    }),
    password: Joi.string().regex(regEx.password.pattern).messages({
        'string.pattern.base': regEx.password.msg,
        'string.empty': errorMessage.empty
    }),
    profile: {
        name: Joi.string().regex(regEx.name.pattern).required().messages({
            'string.pattern.base': regEx.name.msg,
            'string.empty': errorMessage.empty

        }),
        surname: Joi.string().regex(regEx.name.pattern).required().messages({
            'string.pattern.base': regEx.name.msg,
            'string.empty': errorMessage.empty
        }),
        age: Joi.number().min(6).max(100).messages({
            'number.min': 'min 6',
            'number.max': 'max 100',
        }),
        phone: Joi.string().regex(regEx.phone.pattern).required().messages({
            'string.pattern.base': regEx.phone.msg,
            'string.empty': errorMessage.empty
        })
    }
});

export {registerValidator}