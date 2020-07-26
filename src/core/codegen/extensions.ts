import { Parameter, Method, Code } from './Base'
import { Emmiter } from './emmiter'
import { between } from '../../utils/utils'

const overrides = "@override"
function generateToString(
    classname: string, ps: Parameter[],
) {
    const s = between(ps.map(p => `${p.name}: $${p.name}`))
    const m = new Method("toString", "String", new Code([`return '${classname} {${s}};'`]), [], [], overrides)
    return m
}

function generateStatlessWidgetBuildMethod(
    classname: string, ps: Parameter[],
) {
    const s = between(ps.map(p => `${p.name}: $${p.name}`))
    const m = new Method("toString", "String", new Code([`return '${classname} {${s}};'`]), [], [], overrides)
    return m
}

function generateEquals(

    classname: string, ps: Parameter[],) {
    const ls = ps.map(p => `o.${p.name} == ${p.name} `)
    ls.unshift(`o is ${classname}`)
    const s = between(ls, " && ")
    const m = new Method("operator ==", "bool", new Code([`if (identical(this,o)) return true`, `\nreturn  ${s}`]), [new Parameter("o", "Object", false, false, false)], [], overrides)
    return m
}

export { generateEquals, generateToString }