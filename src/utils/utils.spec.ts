import { between, splitBySpaces } from './utils'

test('inbetween test ', () => {
    expect(between(['a', 'b', 'c'])).toBe("a, b, c")
})


test('splitBySpaces test ', () => {

    expect(splitBySpaces("  ss \n \n  s   s  ss s ")).toStrictEqual(["ss", "s", "s", "ss", "s"])
    expect(splitBySpaces("  \n\t ")).toStrictEqual([])
})

