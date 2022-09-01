from enum import Enum


class RegEx(Enum):
    EXAMPLE = (
        r'',
        ''
    )

    def __init__(self, pattern: str, msg: str | list[str]):
        self.pattern = pattern
        self.msg = msg
