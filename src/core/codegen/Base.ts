import { Emmiter } from './emmiter'
import { NL, between, braces } from '../../utils/utils'
import { isListNotEmpty, isNotEmptyString } from '../../utils/tsUtils'

import indentString from 'indent-string'
export interface Spec {


    // Emitter is kept optional as in some instances we may have some content in emitter
    accept<T>(visitor: SpecVisitor<T>, emitter: T): T
}

// E will be emitter could change definetly
export interface SpecVisitor<E> {

    visitField(spec: Field, e: E): E

    visitMethod(spec: Method, e: E): E

    visitClass(spec: Class, e: E): E
}

export class CodeGenerator implements SpecVisitor<Emmiter>  {
    visitClass(spec: Class, e: Emmiter): Emmiter {
        return e
    }

    visitMethod(spec: Method, e: Emmiter): Emmiter {
        var params = ""
        const unp = this.visitParameter(spec.unnamedParams)

        const np = this.visitParameter(spec.namedParams)


        // check if we have both named and unnamed  if yes do it 
        // handle case for one and one 
        if (isListNotEmpty(spec.unnamedParams) && isListNotEmpty(spec.namedParams)) {
            params = `${unp},{${np}}`
        } else if (isListNotEmpty(spec.unnamedParams)) {
            params = `${unp}`
        } else if (isListNotEmpty(spec.namedParams)) {
            params = `{${np}}`
        } else {
            params = ''
        }

        const indentedCode = indentString(spec.code.code, e.indent)
        // console.log({ params, np ,unp })
        const s = `${spec.returnType} ${spec.name}(${params}){${NL}${indentedCode}}`
        e.emit(s)
        return e
    }

    visitParameter(ps: Parameter[]) {
        const ns = ps.map(p => `${p.required ? "@required " : ""}${p.type} ${p.name}`)
        return between(ns)

        // if (named) {
        //     ns.map(n=> {
        //         if 
        //         return ''
        //     })
        // }
        // return named ? braces(between(paa)) : between(ns)
    }

    visitField(spec: Field, e: Emmiter): Emmiter {
        const s = `${spec.modifier} ${spec.type} ${spec.name};`
        e.emit(s)
        return e
    }
}

export class Field implements Spec {

    constructor(public name: string, public type: string, public modifier: "final" | "var" | "const",) { }

    accept<T>(visitor: SpecVisitor<T>, emitter: T): T {
        return visitor.visitField(this, emitter)
    }
}
export class Code {

    constructor(private codes: string[] = []) { }

    public get code(): string {
        return between(this.codes.map(c => c + ";\n"), "")
    }
}



export class Class implements Spec {

    constructor(public name: string, public type: string, public modifier: "final" | "var" | "const",) { }

    accept<T>(visitor: SpecVisitor<T>, emitter: T): T {
        return visitor.visitField(this, emitter)
    }
}

// /// Optional parameters.
// BuiltList<Parameter> get optionalParameters;

// /// Required parameters.
// BuiltList<Parameter> get requiredParameters;
export class Method implements Spec {

    constructor(public name: string, public returnType: string, public code: Code,
        public unnamedParams: Parameter[], public namedParams: Parameter[]) { }

    accept<T>(visitor: SpecVisitor<T>, emitter: T): T {
        return visitor.visitMethod(this, emitter)
    }
}

export class Parameter {

    /**
    @param isThis -  This is only valid on constructors;
    **/

    constructor(public name: string, public type: string, public isNamed = false,
        public isThis: boolean = false, public required: boolean = false) { }

}


// export interface Parameter {

//     name: string 
//     isNamed: boolean 
//     type: string

//     /**
//     @param isThis -  This is only valid on constructors;
//     **/

//     isThis: boolean
//     required: boolean
// }

