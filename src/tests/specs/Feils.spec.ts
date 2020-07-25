import { Field, Code, Method, Parameter } from '../../core/codegen/Base'
import { equalsDart, strings, logCode, dartCode, logString } from './testutils'
export { }

test('should emit correct field', () => {
    const f = new Field("fruit", "String", "const")
    const expected = "const String fruit;\n"
    equalsDart(f, expected)
})


test('should emit correct Method', () => {
    const m = new Method("haveFruit", "dynamic", new Code(["Hare", "Hare", "Hare"]),
        [new Parameter('a', 'String'), new Parameter('b', 'String')],
        [new Parameter('c', 'String'), new Parameter('d', 'String')])
    const expected = 'dynamic haveFruit(String a, String b,{String c, String d}){\n' +
        '   Hare;\n' +
        '   Hare;\n' +
        '   Hare;\n' +
        '}\n'

    // logString(expected)
    const e = equalsDart(m, expected)
    // logString(e.last)

})

test('Code test', () => {
    const c = new Code(strings)
    expect(c.code).toBe("a;\nb;\nc;\n")
})

