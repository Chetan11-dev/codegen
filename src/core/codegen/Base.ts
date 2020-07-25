import { between, braces } from '../../utils/utils'
import { isNotEmptyString } from '../../utils/tsUtils'

export interface Spec {


    // Emitter is kept optional as in some instances we may have some content in emitter
    accept<T>(visitor: SpecVisitor<T>, emitter: T): T
}

// E will be emitter could change definetly
export interface SpecVisitor<E> {

    visitField(spec: Field, e: E): E

    visitMethod(spec: Method, e: E): E

    visitClass(spec: Class, e: E): E


    visitConstructor(spec: Constructor, e: E): E

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

export class Constructor implements Spec {
    constructor(public className: string, public unnamedParams: Parameter[], public namedParams: Parameter[]) { }
    accept<T>(visitor: SpecVisitor<T>, emitter: T): T {
        return visitor.visitConstructor(this, emitter)
    }
}

export class Parameter {

    /**
    @param isThis -  This is only valid on constructors;
    **/

    constructor(public name: string, public type: string, public isNamed: boolean,
        public isThis: boolean, public required: boolean) { }

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