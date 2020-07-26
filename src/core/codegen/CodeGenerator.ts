import { Emmiter } from './emmiter'
import { NL, between } from '../../utils/utils'
import { isListNotEmpty, isEmptyString, isNotEmptyString } from '../../utils/tsUtils'
import indentString from 'indent-string'
import { SpecVisitor, Constructor, Class, Method, Parameter, Code } from './Base'

export class CodeGenerator implements SpecVisitor<Emmiter> {

    visitConstructor(spec: Constructor, e: Emmiter): Emmiter {

        const params = this.makeParams(spec.unnamedParams, spec.namedParams, this.mapConstructorParam)

        const s = `${spec.className}(${params})${spec.pr ? ` : super(${this.mapSuperParam(spec.pr.params)})` : ""};`
        e.emit(s)
        return e
    }

    mapSuperParam(ps: Parameter[]) {
        return (between(ps.map(p => `${p.name} : ${p.name}`)))
    }

    mapSuperParams<E>(p: E, f: (e: E) => string) { }


    visitClass(spec: Class, e: Emmiter): Emmiter {
        // this.mapSuperParams(spec.imports , (i) => {

        // })

        var s = spec.imports ? `${spec.imports.code}\n` : ""

        e.emitNoLine(s)
        // console.log(e.last)
        s = `class ${spec.name} ${spec.pr ? `extends ${spec.pr.name} ` : ''}{`
        e.emit(s)

        e.emitWithIndent((e) => {
            var feilds: Parameter[] = []

            if (spec.cons) {
                feilds = spec.cons.unnamedParams.concat(spec.cons.namedParams)
                if (isListNotEmpty(feilds)) {
                    e.emitLine()

                }
            }

            feilds.forEach(f => this.visitField(f, e))
            e.emitLine()

            if (spec.cons) {
                this.visitConstructor(spec.cons, e)
                e.emitLine()
            }
            spec.methods.forEach(m => this.visitMethod(m, e))

            spec.classdeoendentmethods.forEach(m => {
                this.visitMethod(m(spec.name, feilds), e)
            })


        })

        e.emit("}")
        return e
    }

    visitMethod(spec: Method, e: Emmiter): Emmiter {
        const params = this.makeParams(spec.unnamedParams, spec.namedParams)

        const indentedCode = indentString(spec.code.code, e.indent)
        // console.log({ params, np ,unp })

        var s = ""
        if (isNotEmptyString(spec.anaotations)) {
            s = spec.anaotations + "\n"
        }
        s = s + `${spec.returnType} ${spec.name}(${params}){${NL}${indentedCode}}`
        // console.log(s)
        e.emit(s)
        e.emitLine()
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

    visitField(spec: Parameter, e: Emmiter): Emmiter {
        const s = `${isEmptyString(spec.modifier) ? "" : `${spec.modifier} `}${isEmptyString(spec.type) ? "" : `${spec.type} `}${spec.name};`
        e.emit(s)
        return e
    }
}
