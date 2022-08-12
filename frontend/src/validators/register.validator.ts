import Joi from "joi";

const registerValidator = Joi.object({
    email: Joi.string().email({minDomainSegments: 2, tlds: {allow: false}}).required().messages({
        'string.empty': 'Поле не можу бути пустим',
        'string.email': 'Дані введено не коректно'
    }),
    password: Joi.string().regex(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{8,50})\S$/).messages({
        'string.pattern.base': 'Пароль має містити 1 цифру, 1 велику і 1 маленьку літеру без пробілів. Кількість символів 8-50',
        'string.empty': 'Поле не може бути пустим'
    }),
    profile: {
        name: Joi.string().regex(/^[a-zA-ZА-яёЁЇїІіЄєҐґ]{2,50}$/).required().messages({
            'string.pattern.base': 'Тільки літери 2-50 символів',
            'string.empty': 'Поле не може бути пустим'

        }),
        surname: Joi.string().regex(/^[a-zA-ZА-Яа-яёЁЇїІіЄєҐґ]{2,50}$/).required().messages({
            'string.pattern.base': 'Тільки літери 2-50 символів',
            'string.empty': 'Поле не може бути пустим'
        }),
        age: Joi.number().min(6).max(100).required().messages({
            'number.min': 'Мінімум 6',
            'number.max': 'Максимум 100',
            'number.empty': 'Поле не може бути пустим',
        }),
        phone: Joi.string().regex(/^0\d{9}$/).required().messages({
            'string.pattern.base': 'Номер потрібно вводити в такому форматі: 095XXXXXXX',
            'string.empty': 'Поле не може бути пустим'
        })
    }
});

export {registerValidator}