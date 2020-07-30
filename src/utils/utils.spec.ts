import { between, splitByBlanks } from './utils'
import { isEmpty } from './tsUtils'

test('inbetween test ', () => {
    expect(between(['a', 'b', 'c'])).toBe("a, b, c")
})


test('splitBySpaces test ', () => {
    expect(splitByBlanks("  ss \n \n  s   s  ss s ")).toStrictEqual(["ss", "s", "s", "ss", "s"])
    expect(splitByBlanks("  \n\t ")).toStrictEqual([])
})


test('isEmpty test ', () => {
    expect(isEmpty("  \n\t ")).toBeFalsy()
    expect(isEmpty("  ")).toBeFalsy()
    expect(isEmpty("")).toBeTruthy()
    expect(isEmpty(null)).toBeTruthy()
    expect(isEmpty(undefined)).toBeTruthy()
})

