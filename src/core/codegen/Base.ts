import { between, braces } from '../../utils/utils'
import { isNotEmptyString } from '../../utils/tsUtils'
// import { Parameter } from './Base'

export interface Spec {


    // Emitter is kept optional as in some instances we may have some content in emitter
    accept<T>(visitor: SpecVisitor<T>, emitter: T): T
}

// E will be emitter could change definetly
export interface SpecVisitor<E> {

    visitField(spec: Parameter, e: E): E

    visitMethod(spec: Method, e: E): E

    visitClass(spec: Class, e: E): E

    visitConstructor(spec: Constructor, e: E): E

}

export class Code {

    constructor(private codes: string[] = []) { }

    public get code(): string {
        return between(this.codes.map(c => c + ";\n"), "")
    }
}


export type f = (classname: string, ps: Parameter[]) => Method

export class Class implements Spec {

    constructor(public name: string, public cons: Constructor, public methods: Method[], public classdeoendentmethods: f[], public pr?: Parent, public imports?: Code) { }

    accept<T>(visitor: SpecVisitor<T>, emitter: T): T {
        return visitor.visitClass(this, emitter)
    }
}

export interface Parent {
    name: string,
    params: Parameter[]
}

export class Method implements Spec {

    constructor(public name: string, public returnType: string, public code: Code,
        public unnamedParams: Parameter[], public namedParams: Parameter[], public anaotations: string = "") { }

    accept<T>(visitor: SpecVisitor<T>, emitter: T): T {

        return visitor.visitMethod(this, emitter)
    }
}

export interface Options {
    equals: Boolean
    toString: Boolean
    hashCode: Boolean
}

export class Constructor implements Spec {
    constructor(public className: string, public unnamedParams: Parameter[], public namedParams: Parameter[], public pr?: Parent) { }
    accept<T>(visitor: SpecVisitor<T>, emitter: T): T {
        return visitor.visitConstructor(this, emitter)
    }
}


// export interface Parameter {
//     isNamed: boolean
//     name: string
//     type: string

//     /**
//      * 
//     @param isThis -  This is only valid on constructors;
//     @param modifier -  This is only valid on constructors;
//     **/
//     modifier?: 'final' | 'var' | 'const'
//     isThis: boolean
//     required: boolean
// }
export class Parameter implements Spec {

    /** 
    @param isThis -  This is only valid on constructors;
    @param modifier -  This is only valid on constructors;
    **/

    copyWith(name: string): Parameter {
        return new Parameter(name, this.type, this.isNamed, this.isThis, this.required, this.modifier)
    }

    constructor(public name: string, public type: string, public isNamed: boolean,
        public isThis: boolean, public required: boolean, public modifier: 'final' | 'var' | 'const' = "final") { }

    accept<T>(visitor: SpecVisitor<T>, emitter: T): T {
        return visitor.visitField(this, emitter)
    }

}


// export class Field implements Spec {

//     constructor(public name: string, public type: string, public modifier: 'final' | 'var' | 'const'
//     ) { }

//     accept<T>(visitor: SpecVisitor<T>, emitter: T): T {
//         return visitor.visitField(this, emitter)
//     }
// }

// export class Parameter implements Spec {

//     constructor(public name: string, public type: string,  { ...Parameter} ) { }

// }

// Not needed modifier 
