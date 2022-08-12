from enum import Enum


class RegEx(Enum):
    PASSWORD = (
        r'^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{8,50})\S$',
        ['password must contain 1 number'
         'password must contain 1 uppercase letters'
         'password must contain 1 lowercase letters'
         'password is 8-50 characters with no space']
    )
    NAME = (
        r'^[a-zA-ZА-яёЁЇїІіЄєҐґ]{2,50}$',
        'only letters min 2 max 50 ch'
    )
    PHONE = (
        r'^0\d{9}$',
        'Invalid phone number'
    )

    def __init__(self, pattern: str, msg: str | list[str]):
        self.pattern = pattern
        self.msg = msg
