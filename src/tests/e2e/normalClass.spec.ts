import { Code, Method, Parameter, Constructor, Class, } from '../../core/codegen/Base'
import { equalsDart, strings, dartCode, logString, logCode, codeGenCheck } from '../testutils'
import { Emmiter } from '../../core/codegen/emmiter'
import { generateToString, generateEquals } from '../../core/codegen/extensions'
export { }

// Template for debugging
// logCode(cl, false)
// logCode(cl, true)

// equalsDart(cl, clex, false)

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


const m = new Method("haveFruit", "dynamic", c,
    unnamedparams.map(p => {
        p.type = "String"
        return p
    }),
    namedparams.map(p => {
        p.type = "String"
        return p
    }))

const co = new Constructor("Fruit",
    unnamedparams,
    namedparams)
const cl = new Class("Fruit", [m,], [generateToString, generateEquals], co,)

const clex = 'class Fruit {\n' +
    '\n' +
    '   final String a;\n' +
    '   final String b;\n' +
    '   final String c;\n' +
    '   final String d;\n' +
    '\n' +
    '   Fruit(this.a, this.b,{this.c, this.d});\n' +
    '\n' +
    '   dynamic haveFruit(String a, String b,{String c, String d}){\n' +
    '      a;\n' +
    '      b;\n' +
    '      c;\n' +
    '   }\n' +
    '\n' +
    '   @override\n' +
    '   String toString(){\n' +
    "      return 'Fruit {a: $a, b: $b, c: $c, d: $d};';\n" +
    '   }\n' +
    '\n' +
    '   @override\n' +
    '   bool operator ==(Object o){\n' +
    '      if (identical(this,o)) return true;\n' +
    '\n' +
    '      return  o is Fruit && o.a == a  && o.b == b  && o.c == c  && o.d == d ;\n' +
    '   }\n' +
    '\n' +
    '}\n'

test('should emit correct Class Simple', () => {
    // logCode(cl, true)
    // logCode(cl, false)
    equalsDart(cl, clex, false)
})


test('should emit correct Class given no feilds and constructor', () => {

    const cl = new Class("Fruit", [], [generateEquals, generateToString],)
    const ex = 'class Fruit {\n' +
        '\n' +
        '   @override\n' +
        '   bool operator ==(Object o){\n' +
        '      if (identical(this,o)) return true;\n' +
        '\n' +
        '      return  o is Fruit;\n' +
        '   }\n' +
        '\n' +
        '   @override\n' +
        '   String toString(){\n' +
        "      return 'Fruit {};';\n" +
        '   }\n' +
        '\n' +
        '}\n'
    equalsDart(cl, ex,)

})
