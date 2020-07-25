import { Field, Spec, CodeGenerator } from './Base'
import { Emmiter } from '../../core/core/emmiter'
export function equalsDart(p: Spec, content: string) {
    expect(dartCode(p)).toBe(content)
}

export function dartCode(p: Spec) {
    return (p.accept(new CodeGenerator(), new Emmiter())).content
}

export function printDartCode(p: Spec) {
    console.log(dartCode(p))
}
