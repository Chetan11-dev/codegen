import { Emmiter } from './emmiter'

export interface Spec {

    // Emitter is kept optional as in some instances we may have some content in emitter
    accept<T>(visitor: SpecVisitor<T>, emitter: T): T
}

// E will be emitter could change definetly
export interface SpecVisitor<E> {
    visitField(spec: Field, emitter: E): E
}

export class CodeGenerator implements SpecVisitor<Emmiter>  {

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