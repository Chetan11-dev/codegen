import { Parameter, Constructor, Class, } from '../../core/codegen/Base'
import { equalsDart } from '../testutils'
import { materialImport } from '../../core/codegen/extensions'
import { f, m, co, c, unnamedParams, namedParams } from '../shared/shared'
export { }



export const cex = "a;\nb;\nc;\n"

export const fex = "final e;\n"


export const mex = 'dynamic haveFruit(String a, String b,{String c, String d}){\n' +
    '   a;\n' +
    '   b;\n' +
    '   c;\n' +
    '}\n\n'


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


test('class should emit class with correct EXTENDS', () => {


    const c = new Constructor({ className: "Fruit", namedParams, unnamedParams }, {
        name: "Veg", params: [
            new Parameter({ name: "key", type: "Key" },),
            new Parameter({ name: "keya", type: "Key" },)
        ]
    })

    const cl = new Class({ className: "Fruit", namedParams, unnamedParams, cons: c, pr: "Veg" }, [],)


    const ex = 'class Fruit extends Veg {\n' +
        '   final String a;\n' +
        '   final String b;\n' +
        '   final String c;\n' +
        '   final String d;\n' +
        '\n' +
        '   Fruit(this.a, this.b,{this.c, this.d, Key key, Key keya}) : super(key : key, keya : keya);\n' +
        '\n' +
        '}\n'
    // logCode(cl, false)
    equalsDart(cl, ex,)
})