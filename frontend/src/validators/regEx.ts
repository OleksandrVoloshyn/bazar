const regEx = {

    email: {pattern: /^.+@.+\..+$/, msg: 'Invalid email'},
    password: {
        pattern: /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{8,50})\S$/,
        msg: '1 number,1 Upper, 1 lower, 8-50 ch'
    },
    name: {pattern: /^[a-zA-ZА-яёЁЇїІіЄєҐґ]{2,50}$/, msg: 'only letters min 2 max 50 ch'},
    phone: {pattern: /^0\d{9}$/, msg: 'Invalid phone, example -> 095*******'},
}

export {regEx}