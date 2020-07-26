import { Code, Method, Parameter, Constructor, Class, } from '../../core/codegen/Base'
import { equalsDart, strings, dartCode, logString, logCode, codeGenCheck } from '../testutils'
import { Emmiter } from '../../core/codegen/emmiter'
import { generateToString, generateEquals, materialImport } from '../../core/codegen/extensions'
export { }



// TYPE IS NOT DEFINED IN CASE OF 
export const a: Parameter = new Parameter({ name: "a", type: "" },)
export const unnamedParams: Parameter[] = [a, a.copyWith("b")]
export const namedParams: Parameter[] = [a.copyWith("c"), a.copyWith("d")]
// const unnamedfields: Field[] = [new Field("a", "String", "const"), new Field("b", "String", "const")]
// const namedfields: Field[] = [new Field("c", "String", "const"), new Field("d", "String", "const")]

export const c = new Code(strings)
export const cex = "a;\nb;\nc;\n"

export const f: Parameter = a.copyWith("e")
export const fex = "final e;\n"

export const m = new Method({ name: "haveFruit", returnType: "dynamic", code: c }, {
    unnamedParams: unnamedParams.map(p => {
        p.pi.type = "String"
        return p
    }),
    namedParams:
        namedParams.map(p => {
            p.pi.type = "String"
            return p
        })
})

export const mex = 'dynamic haveFruit(String a, String b,{String c, String d}){\n' +
    '   a;\n' +
    '   b;\n' +
    '   c;\n' +
    '}\n\n'

export const co = new Constructor({
    className: "Fruit",
    namedParams: namedParams
    ,
    unnamedParams: unnamedParams,

})

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
    // const cl = new Class("Fruit", [], [], undefined, undefined, materialImport)
    const cl = new Class({ className: "Fruit", namedParams: [], unnamedParams: [], imports: materialImport },)
    const ex = "import 'package:flutter/material.dart';\n\nclass Fruit {\n\n}\n"
    equalsDart(cl, ex,)
})


test('apaaaw should emit class with correct EXTENDS', () => {


    const c = new Constructor({ className: "Fruit", namedParams, unnamedParams: [] }, {
        name: "Veg", params: [
            new Parameter({ name: "key", type: "Key" },),
            new Parameter({ name: "keya", type: "Key" },)
        ]
    })

    const cl = new Class({ className: "Fruit", namedParams, unnamedParams: [], cons: c, pr: "Veg" },)

    // const cl = new wqClass("Fruit", [], [],
    //  new Constructor("Fruit", [], [], { name: "Veg",
    //   params: [
    // new Parameter("key", "", false, false, false),
    //    new Parameter("keya", "", false, false, false)] }), 
    //    { name: "Veg", params: [new Parameter("key", "", false, false, false),
    //  new Parameter("keya", "", false, false, false)] },)

    const ex = 'class Fruit extends Veg {\n\n   Fruit() : super(key : key, keya : keya);\n\n}\n'

    equalsDart(cl, ex, true)
})