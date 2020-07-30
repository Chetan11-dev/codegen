/* eslint-disable eqeqeq */
/* eslint-disable no-throw-literal */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Line } from './parser.spec'
import { matchParam, matchMeth, argsCapture, matchClassDeclarations, matchFuncDeclarations, matchDeclaration } from './matchDeclaration'
import { Class, ParameterInfo, Constructor } from '../../../core/codegen/Base'
import { impossible } from './impossible'
import { determineDefaultOptions, defaultClassOptions, DefaultOptionFromMeths, mapParams, mapParamsForMeth, seperateParams, generateClassOptions, copyFeildsToConstructore, generateStateOptions } from './mappers'
import { splitByBlanks } from '../../../utils/utils'
import { optionsToMeth, generateStatelessWidget_, generateStatefullWidget_ } from '../../../core/codegen/extensions'
import { logCode } from '../../testutils'
import { dartTypeOf } from './objectsmappers'
interface ReturnType {
    stateFull?: {
        state: Class
        widget: Class
    },
    class?: Class
}


function toClass(p: RegExpExecArray, meths: RegExpExecArray[], params: RegExpExecArray[]): ReturnType {

    const className = p[2]
    // console.log(p)
    type args = undefined | string

    const optionalargs = p[3] ? p[3] : ''
    // console.log({className, optionalargs})
    var arr: string[] = []

    arr = arr.concat(defaultClassOptions).concat(splitByBlanks(optionalargs))

    const parameterOptions = determineDefaultOptions(arr,)
    const methParmOptions: DefaultOptionFromMeths = parameterOptions

    function parmHelper<A>(p: RegExpExecArray, ff: (type: ParameterInfo, options: string[]) => A) {

        const type = dartTypeOf(p[1])
        const name = p[2]
        const options = splitByBlanks(p[5] ? p[5] : '')
        return ff({ type, name }, options)
    }

    const aggs = params.map(p => {
        return parmHelper(p, (pi, options) => mapParams(pi, options, parameterOptions))
    })

    const ps = seperateParams(aggs)
    const cs = seperateParams(copyFeildsToConstructore(aggs))

    var cl = new Class({
        className, namedParams: ps.namedParams, unnamedParams: ps.unnamedParams
        , cons: new Constructor({ className, namedParams: cs.namedParams, unnamedParams: cs.unnamedParams, })
    },
        optionsToMeth(generateClassOptions(arr)))
    const stateOptions = generateStateOptions(arr)
    if (stateOptions.stf) {
        return { stateFull: generateStatefullWidget_(cl) }
    }
    else if (stateOptions.stl) {
        // console.log(cl)
        generateStatelessWidget_(cl)
    }

    return { class: cl }

    /** make meths */
    // const ms = meths.map(m => {
    //     return parmHelper(m, (pi, options) => {
    //         return mapParamsForMeth(pi, options, methParmOptions)
    //     })
    // })

    // const c = new Class({ className, namedParams: [], unnamedParams: [], },)
    // return c 
}


function decToFuncs(p: RegExpExecArray) {
    const text = p[0], className = p[1]
    const optionalargs = p[2] as undefined | string


    if (optionalargs) {

    } else {
        const c = new Class({ className, namedParams: [], unnamedParams: [], },)
    }
}

enum ParseState {
    Func,
    Class,
    Capturing,
    // It will skip a line 
    Skip
}
enum ClassState {
    meth,
    params
}

interface Error {
    shouldThrow: boolean
    error: () => void
}

export function findNextClassFeild(p: string,) {
    var a
    // console.log({ a: matchParam("params") })
    if ((a = matchParam(p)) || (a = matchMeth(p))) {
        return a[0] as 'meths' | 'params'
    }
}



export function parse(ls: Line[]) {
    // Code executed on skipping
    // console.log(ls)
    var onSkip: () => void = () => { throw "error" }
    const e: Error = { error: () => { throw "error" }, shouldThrow: false }
    var classState = ClassState.params
    const err: number[] = []

    var state = ParseState.Capturing, toCreatState: ParseState.Class | ParseState.Func | undefined

    const meths: RegExpExecArray[] = []
    const params: RegExpExecArray[] = []
    const funcs: RegExpExecArray[] = []

    // var nextLine: Line | undefined

    var declaration: RegExpExecArray
    // declaration = ls[0]
    function capture(text: string, l: Line, ls: RegExpExecArray[]) {
        const result = argsCapture(text)
        if (result) {
            ls.push(result)
        }
        else {
            err.push(l.num)
        }
    }

    ls.forEach((l, i) => {
        const nextLine = ls[i + 1] as Line | undefined

        // const nextnum = nextLine.num
        // const nexttext = nextLine.text

        // const { nextnum, text as a } = nextLine
        const { num, text } = l

        switch (state) {
            case ParseState.Capturing:
                const r = matchDeclaration(text)
                // console.log(r)
                if (r) {
                    declaration = r
                    if (r[1] == 'func') {
                        toCreatState = ParseState.Func
                        state = ParseState.Func
                    } else if (r[1] == 'cl') {
                        if (nextLine) {
                            const f = findNextClassFeild(nextLine.text)
                            if (f) {
                                state = ParseState.Skip
                                onSkip = () => {
                                    classState = determineClassState(f, classState)
                                    state = ParseState.Class
                                    toCreatState = ParseState.Class
                                }
                            } else {
                                e.shouldThrow = true
                                e.error = () => { throw `Expected meths or params recieved ${nextLine.text}` }
                            }
                        }
                    }
                    // Regex could be only func or class 
                    else impossible()
                } else {
                    err.push(num)
                }
                break
            case ParseState.Class:
                switch (classState) {
                    case ClassState.meth:
                        capture(text, l, meths)
                        break
                    case ClassState.params:
                        capture(text, l, params)
                        break
                }
                if (nextLine) {
                    const f = findNextClassFeild(nextLine.text)
                    if (f) {
                        state = ParseState.Skip
                        onSkip = () => {
                            classState = determineClassState(f, classState)
                            state = ParseState.Class
                        }
                    }
                }
                break
            case ParseState.Func:
                capture(text, l, funcs)
                break
            case ParseState.Skip:
                onSkip()
                break

        }

        if (e.shouldThrow) {
            e.error()
        }
    })

    if (state === ParseState.Capturing) {
        console.log("Do make sure that your declatation matches make func or make cl className")
        return
    }

    // console.log({ declaration: declaration!, meths, params, funcs, state, toCreatState, err })

    switch (toCreatState) {
        // we will have declarations use it 
        case ParseState.Class:
            //  get hold of declartions parse it log it
            const clazz = toClass(declaration!, meths, params)
            if (clazz.class) {
                logCode(clazz.class, false)
            } else if (clazz.stateFull) {

                logCode(clazz.stateFull.widget, false)

                logCode(clazz.stateFull.state, false)
            }
            // make coreesoponding class 
            // make params 
            // unnamed and named
            // make meths 
            // apply defaults if anything is undefined
            // make it 

            break
        case ParseState.Func:
            // const classDeclaration = matchDeclaration(declaration!.text)
            // const clazz = toClass(classDeclaration!)
            break
        case undefined:
            impossible()
            break
    }


}

function determineClassState(f: string, classState: ClassState) {
    if (f == 'meths') {
        return ClassState.meth
    }
    else if (f == 'params') {
        return ClassState.params
    }
    else
        impossible()
    return classState
}

