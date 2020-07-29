export function between(ls: string[], between = ", ") {
    // same as ls.length == 0
    if (ls.length === 0) {
        return ""
    }
    if (ls.length === 1) {
        return ls[0]
    }

    return ls.reduce((r, rs) => r + between + rs)
}

export function splitBySpaces(text: string) {
    text = text.trim()
    // replace more than  2  spaces with 1 
    text = text.replace(/\s{2,}/g, ' ')
    return text.split(" ")
        .filter(t => t.length > 0)

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
    return content + NL
}

export function braces(content = "", start = "{", end = "}") {
    return start + content + end
}

export const NL = '\n'