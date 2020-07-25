import { Emmiter } from './emmiter'
import { NL, between } from '../../utils/utils'
import { isListNotEmpty } from '../../utils/tsUtils'
import indentString from 'indent-string'
import { SpecVisitor, Constructor, Class, Method, Parameter, Field } from './Base'

export class CodeGenerator implements SpecVisitor<Emmiter> {

    visitConstructor(spec: Constructor, e: Emmiter): Emmiter {
        const params = this.makeParams(spec.unnamedParams, spec.namedParams, this.mapConstructorParam)
        const s = `${spec.className}(${params});`
        e.emit(s)
        return e

    }
    visitClass(spec: Class, e: Emmiter): Emmiter {
        return e
    }

    visitMethod(spec: Method, e: Emmiter): Emmiter {
        const params = this.makeParams(spec.unnamedParams, spec.namedParams)

        const indentedCode = indentString(spec.code.code, e.indent)
        // console.log({ params, np ,unp })
        const s = `${spec.returnType} ${spec.name}(${params}){${NL}${indentedCode}}`
        e.emit(s)
        return e
    }


    private makeParams(unnamedParams: Parameter[], namedParams: Parameter[], f: (ps: Parameter) => string = this.mapParam) {

        var params = ""
        const unp = this.visitParameter(unnamedParams, f)
        const np = this.visitParameter(namedParams, f)


        // check if we have both named and unnamed  if yes do it 
        // handle case for one and one 
        if (isListNotEmpty(unnamedParams) && isListNotEmpty(namedParams)) {
            params = `${unp},{${np}}`
        }
        else if (isListNotEmpty(unnamedParams)) {
            params = `${unp}`
        }
        else if (isListNotEmpty(namedParams)) {
            params = `{${np}}`
        }
        else {
            params = ''
        }

        return params
    }

    visitParameter(ps: Parameter[], f: (ps: Parameter) => string) {
        const ns = ps.map(f)
        return between(ns)
    }


    private mapConstructorParam(p: Parameter) {
        return (`this.${p.name}`)
    }


    private mapParam(p: Parameter) {
        return (`${p.required ? "@required " : ""}${p.type} ${p.name}`)
    }

    visitField(spec: Field, e: Emmiter): Emmiter {
        const s = `${spec.modifier} ${spec.type} ${spec.name};`
        e.emit(s)
        return e
    }
}
