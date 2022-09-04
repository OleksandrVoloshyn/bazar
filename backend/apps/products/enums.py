from enum import Enum


class RegEx(Enum):
    COLOR = (
        r'^[a-zA-ZА-яёЁЇїІіЄєҐґ]{2,25}$',
        'only letters min 2 max 25 ch')

    def __init__(self, pattern: str, msg: str | list[str]):
        self.pattern = pattern
        self.msg = msg
