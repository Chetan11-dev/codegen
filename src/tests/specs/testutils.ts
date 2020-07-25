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

export function logCode(p: Spec, shouldLogUniCode = true) {
    if (shouldLogUniCode) {
        logString(dartCode(p)[0] as string)
    } else {
        log(dartCode(p)[0] as string)
    }
}
function log(params: string) {
    console.log("---------------------")
    console.log(params)
    console.log("---------------------")
}

// Logs string displaying all \n 
export function logString(p = "") {
    console.log([p])
}
export const strings = ['a', 'b', 'c']