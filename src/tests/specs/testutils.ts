import { Spec } from '../../core/codegen/Base'
import { CodeGenerator } from "../../core/codegen/CodeGenerator"
import { Emmiter } from '../../core/codegen/emmiter'
export function equalsDart(p: Spec, content: string, log = false) {


    const [codeString, e] = dartCode(p)
    if (log) {
        logCode(p)
    } else
        expect(codeString).toBe(content)
    return e as Emmiter
}

export function dartCode(p: Spec) {
    const e = new Emmiter()
    return [((p.accept(new CodeGenerator(), e)).content), e]
}

function logCode(p: Spec) {
    logString(dartCode(p)[0] as string)
}

// Logs string displaying all \n 
export function logString(p = "") {
    console.log([p])
}
export const strings = ['a', 'b', 'c']