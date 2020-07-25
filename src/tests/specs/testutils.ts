import { Field, Spec, CodeGenerator } from '../../core/codegen/Base'
import { Emmiter } from '../../core/codegen/emmiter'
export function equalsDart(p: Spec, content: string) {
    const [codeString, e] = dartCode(p)

    expect(codeString).toBe(content)
    return e as Emmiter
}

export function dartCode(p: Spec) {
    const e = new Emmiter()

    return [((p.accept(new CodeGenerator(), e)).content), e]
}

export function logCode(p: Spec) {
    logString(dartCode(p)[0] as string)
}

// Logs string displaying all \n 
export function logString(p = "") {
    console.log([p])
}
export const strings = ['a', 'b', 'c']