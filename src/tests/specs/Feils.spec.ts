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

test('Code test', () => {
    expect(c.code).toBe(cex)
})


test('should emit class with correct imports', () => {
    const cl = new Class("Fruit", [], [], undefined, undefined, new Code(["import 'package:flutter/material.dart'"]))
    const ex = "import 'package:flutter/material.dart';\n\nclass Fruit {\n\n}\n"
    equalsDart(cl, ex,)
})


test('should emit class with correct EXTENDS', () => {
    const cl = new Class("Fruit", [], [], new Constructor("Fruit", [], [], { name: "Veg", params: [new Parameter("key", "", false, false, false), new Parameter("keya", "", false, false, false)] }), { name: "Veg", params: [new Parameter("key", "", false, false, false), new Parameter("keya", "", false, false, false)] },)

    const ex = 'class Fruit extends Veg {\n\n   Fruit() : super(key : key, keya : keya);\n\n}\n'

    equalsDart(cl, ex,)
})
