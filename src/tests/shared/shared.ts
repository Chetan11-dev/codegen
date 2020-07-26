import { Code, Method, Parameter, Constructor } from '../../core/codegen/Base'
import { strings } from '../testutils'
// TYPE IS NOT DEFINED IN CASE OF 



export const a: Parameter = new Parameter({ name: "a", type: "" })
export const unnamedParams: Parameter[] = [a, a.copyWith("b")]
export const namedParams: Parameter[] = [a.copyWith("c"), a.copyWith("d")]
// const unnamedfields: Field[] = [new Field("a", "String", "const"), new Field("b", "String", "const")]
// const namedfields: Field[] = [new Field("c", "String", "const"), new Field("d", "String", "const")]
export const f: Parameter = a.copyWith("e")
export const c = new Code(strings)

export const m = new Method({ name: "haveFruit", returnType: "dynamic", code: c }, {
    unnamedParams: unnamedParams.map(p => {
        p.pi.type = "String"
        return p
    }),
    namedParams: namedParams.map(p => {
        p.pi.type = "String"
        return p
    })
})

export const co = new Constructor({
    className: "Fruit",
    namedParams: namedParams,

    unnamedParams: unnamedParams,
})
