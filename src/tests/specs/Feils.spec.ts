import { Field, Code, Method, Parameter, Constructor } from '../../core/codegen/Base'
import { equalsDart, strings, logCode, dartCode, logString } from './testutils'
export { }


const unnamedparams = [new Parameter('a', 'String', false, false, false), new Parameter('b', 'String', false, false, false)]
const namedparams = [new Parameter('c', 'String', false, false, false), new Parameter('c', 'String', false, false, false)]

const c = new Code(strings)
const cex = "a;\nb;\nc;\n"

const f = new Field("fruit", "String", "const")
const fex = "const String fruit;\n"


const m = new Method("haveFruit", "dynamic", c,
    unnamedparams,
    namedparams)

const mex = 'dynamic haveFruit(String a, String b,{String c, String c}){\n' +
    '   a;\n' +
    '   b;\n' +
    '   c;\n' +
    '}\n'

const co = new Constructor("Fruit",
    unnamedparams,
    namedparams)

const coex = 'Fruit(this.a, this.b,{this.c, this.c});\n'


test('should emit correct field', () => {
    equalsDart(f, fex)
})

test('should emit correct Method', () => {
    equalsDart(m, mex,)
})

test('should emit correct Constructor', () => {
    equalsDart(co, coex,)
})

test('Code test', () => {
    expect(c.code).toBe(cex)
})
