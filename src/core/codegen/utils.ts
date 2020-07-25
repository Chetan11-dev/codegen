export function between(ls: string[], between = ", ") {
    // same as ls.length == 0
    if (ls.length) {
        return ""
    }

    return ls.reduce((r, rs) => r + between + rs)
}

export function char_count(str: string, letter: string) {
    var letter_Count = 0
    for (var position = 0; position < str.length; position++) {
        if (str.charAt(position) == letter) {
            letter_Count += 1
        }
    }
    return letter_Count
}

export function line(content = "") {
    return content + NEW_LINE
}

export const NEW_LINE = '\n'