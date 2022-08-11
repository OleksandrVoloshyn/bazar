import Joi from "joi";

const registerValidator = Joi.object({
    email: Joi.string().email({minDomainSegments: 2, tlds: {allow: false}}).required().messages({
        'string.empty': 'Поле для почти не можу бути пустим'
    }),
    password: Joi.string().regex(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,50}$/).messages({
        'string.pattern.base': 'Пароль має містити 1 цифру, 1 велику і 1 маленьку літеру. Кількість символів 8-50',
    }),
    profile: {
        name: Joi.string().regex(/^[a-zA-ZА-яёЁЇїІіЄєҐґ]{2,50}$/).required().messages({
            'string.pattern.base': 'Тільки літери 2-50 символів',
        }),
        surname: Joi.string().regex(/^[a-zA-ZА-Яа-яёЁЇїІіЄєҐґ]{2,50}$/).required().messages({
            'string.pattern.base': 'Тільки літери 2-50 символів',
        }),
        age: Joi.number().min(6).max(100).messages({
            'number.min': 'Мінімум 6',
            'number.max': 'Максимум 100'
        }),
        phone: Joi.string().regex(/^0\d{9}$/).required().messages({
            'string.pattern.base': 'Номер потрібно вводити в такому форматі: 095XXXXXXX',
        })

    }
});

export {registerValidator}