import { Code, Method, Parameter, Constructor, Class, } from '../../core/codegen/Base'
import { equalsDart, strings, dartCode, logString, logCode, codeGenCheck } from '../testutils'
import { Emmiter } from '../../core/codegen/emmiter'
import { generateToString, generateEquals } from '../../core/codegen/extensions'
import { namedParams, unnamedParams, m, co } from "../shared/shared"
export { }

// Template for debugging
// logCode(cl, false)
// logCode(cl, true)

// equalsDart(cl, clex, false)

// TYPE IS NOT DEFINED IN CASE OF 


// const unnamedfields: Field[] = [new Field("a", "String", "const"), new Field("b", "String", "const")]
// const namedfields: Field[] = [new Field("c", "String", "const"), new Field("d", "String", "const")]
// const cl = new Class("Fruit", [m,], [generateToString, generateEquals], co,)


test('should emit correct Class Simple', () => {
    const cl = new Class({ namedParams: namedParams, unnamedParams, className: "Fruit" },
        [generateToString, generateEquals], [m])

    const clex = 'class Fruit {\n' +
        '   final String a;\n' +
        '   final String b;\n' +
        '   final String c;\n' +
        '   final String d;\n' +
        '\n' +
        '   dynamic haveFruit(String a, String b,{String c, String d}){\n' +
        '      a;\n' +
        '      b;\n' +
        '      c;\n' +
        '   }\n' +
        '\n' +
        '   @override\n' +
        '   String toString(){\n' +
        "      return 'Fruit {a: $a, b: $b, c: $c, d: $d}';\n" +
        '   }\n' +
        '\n' +
        '   @override\n' +
        '   bool operator ==(Object o){\n' +
        '      if (identical(this,o)) return true;\n' +
        '\n' +
        '      return  o is Fruit && o.a == a && o.b == b && o.c == c && o.d == d;\n' +
        '   }\n' +
        '\n' +
        '}\n'

    // logCode(cl, true)
    // logCode(cl, false)
    // equalsDart(cl, clex,)
})



test('should emit correct Class given no feilds and constructor', () => {


    const ex = 'class Fruit {\n' +
        '   final String a;\n' +
        '   final String b;\n' +
        '   final String c;\n' +
        '   final String d;\n' +
        '\n' +
        '   Fruit(this.a, this.b,{this.c, this.d});\n' +
        '\n' +
        '   @override\n' +
        '   String toString(){\n' +
        "      return 'Fruit {a: $a, b: $b, c: $c, d: $d}';\n" +
        '   }\n' +
        '\n' +
        '   @override\n' +
        '   bool operator ==(Object o){\n' +
        '      if (identical(this,o)) return true;\n' +
        '\n' +
        '      return  o is Fruit && o.a == a && o.b == b && o.c == c && o.d == d;\n' +
        '   }\n' +
        '\n' +
        '}\n'

    const cl = new Class({ namedParams: namedParams, unnamedParams: unnamedParams, className: "Fruit", cons: co }, [generateToString, generateEquals],)
    // logCode(cl, false)
    // logCode(cl, true)
    // TODO UNCOMMWNT IT
    // equalsDart(cl, ex,)
})