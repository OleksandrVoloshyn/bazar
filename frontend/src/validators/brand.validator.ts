import Joi from "joi";
import {errorMessage} from '../constants'

const BrandValidator = Joi.object({
    name: Joi.string().required().min(2).max(50).messages({
        'string.min': 'name must contain min 2 ch',
        'string.max': 'name must contain max 50 ch',
        'string.empty': errorMessage.empty,
    }),
    description: Joi.string().max(255).empty().allow('').messages({
        'string.max': 'this field must be less than 255 symbols'
    }),
    image: Joi.any()
});

export {BrandValidator}