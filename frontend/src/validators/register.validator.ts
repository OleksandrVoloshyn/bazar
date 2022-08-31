import Joi from "joi";

import {ProfileValidator} from "./profile.validator";
import {errorMessage} from "../constants";
import {regEx} from "./regEx";

const registerValidator = Joi.object({
    email: Joi.string().email({minDomainSegments: 2, tlds: {allow: false}}).required().messages({
        'string.empty': errorMessage.empty,
        'string.email': regEx.email.msg
    }),
    password: Joi.string().regex(regEx.password.pattern).messages({
        'string.pattern.base': regEx.password.msg,
        'string.empty': errorMessage.empty
    }),
    profile: ProfileValidator,
});

export {registerValidator}