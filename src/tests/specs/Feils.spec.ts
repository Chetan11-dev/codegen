import { Code, Method, Parameter, Constructor, Class, } from '../../core/codegen/Base'
import { equalsDart, strings, dartCode, logString, logCode, codeGenCheck } from '../testutils'
import { Emmiter } from '../../core/codegen/emmiter'
import { generateToString, generateEquals } from '../../core/codegen/extensions'
export { }



// TYPE IS NOT DEFINED IN CASE OF 
const a: Parameter = new Parameter(
    "a", "", false, false, false,
    'final'
)

const unnamedparams: Parameter[] = [a, a.copyWith("b")]
const namedparams: Parameter[] = [a.copyWith("c"), a.copyWith("d")]
// const unnamedfields: Field[] = [new Field("a", "String", "const"), new Field("b", "String", "const")]
// const namedfields: Field[] = [new Field("c", "String", "const"), new Field("d", "String", "const")]

const c = new Code(strings)
const cex = "a;\nb;\nc;\n"

const f: Parameter = a.copyWith("e")
const fex = "final e;\n"


const m = new Method("haveFruit", "dynamic", c,
    unnamedparams.map(p => {
        p.type = "String"
        return p
    }),
    namedparams.map(p => {
        p.type = "String"
        return p
    }))

const mex = 'dynamic haveFruit(String a, String b,{String c, String d}){\n' +
    '   a;\n' +
    '   b;\n' +
    '   c;\n' +
    '}\n\n'

const co = new Constructor("Fruit",
    unnamedparams,
    namedparams)

const coex = 'Fruit(this.a, this.b,{this.c, this.d});\n'


test('should emit correct field', () => {
    equalsDart(f, fex)

})

test('should emit correct Method', () => {
    equalsDart(m, mex,)
})

test('should emit correct Constructor', () => {
    equalsDart(co, coex,)
})

// Included in class test
// test('toString test', () => {
//     codeGenCheck(c => {
//         const e = c.generateToString(co.namedParams.concat(co.unnamedParams), new Emmiter(), "Apple")
//         // console.log(e.content)
//     })
// })

// test('equals test', () => {
//     codeGenCheck(c => {
//         const e = c.generateEquals(co.namedParams.concat(co.unnamedParams), new Emmiter(), "Apple")
//         console.log(e.content)
//     })
// })

test('Code test', () => {
    expect(c.code).toBe(cex)
})
