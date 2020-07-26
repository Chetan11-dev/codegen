import { Parameter, Method, Code, Class, Constructor, ClassOptions } from './Base'
import { Emmiter } from './emmiter'
import { between } from '../../utils/utils'

const overrides = "@override"
function generateToString(
    classname: string, ps: Parameter[],
) {
    const s = between(ps.map(p => `${p.pi.name}: $${p.pi.name}`))

    return new Method({ name: "toString", returnType: "String", code: new Code([`return '${classname} {${s}};'`]) }
        , { namedParams: [], unnamedParams: [] }, overrides)

}


// @override
//   Widget build(BuildContext context) {
//     return Container(child: Text("Hello here"),);
//   }



function generateBuildMethod(
    classname: string, ps: Parameter[],
) {
    return new Method({ name: "build", returnType: "Widget", code: new Code([`return Container(child: Text("Hello from ${classname}"),);`]) }
        , { namedParams: [new Parameter({ name: "context", type: "BuildContext" },)], unnamedParams: [] }, overrides)

}
const materialImport = new Code(["import 'package:flutter/material.dart'"])
const keyParam = new Parameter({ name: "key", type: "Key" })
// const keyParamForWidget = new Parameter("key", "Key", true, false, false)
// const keyParamForWidget = new Parameter({name:"key",  type:"Key"} ,)

function generateStatelessWidget(
    className: string, os: ClassOptions = {}, namedParams: Parameter[] = [], unnamedParams: Parameter[] = [],
) {
    const meths = [generateBuildMethod]


    addClassOverrides(os, meths)

    namedParams.unshift(keyParam)


    const c = new Constructor({ className: "Fruit", namedParams: [], unnamedParams: [] }, {
        name: "Veg", params: [
            new Parameter({ name: "key", type: "Key" },),
            new Parameter({ name: "keya", type: "Key" },)
        ]
    })

    const cl = new Class({
        className, namedParams, unnamedParams, imports: materialImport,
        pr: { name: "StatelessWidget", params: [] }
        , cons: new Constructor({ className, namedParams, unnamedParams }, { name: "StatelessWidget", params: [keyParam] })
    })

    return cl
}


function addClassOverrides(os: ClassOptions, meths: ((classname: string, ps: Parameter[]) => Method)[]) {
    if (os.generateEquals) {
        meths.push(generateEquals)
    }

    if (os.generatetoString) {
        meths.push(generateToString)
    }
}

function generateEquals(
    classname: string, ps: Parameter[],) {
    const ls = ps.map(p => `o.${p.pi.name} == ${p.pi.name} `)
    ls.unshift(`o is ${classname}`)
    const s = between(ls, " && ")
    // new Parameter("o", "Object", false, false, false)


    return new Method({ name: "operator ==", returnType: "bool", code: new Code([`if (identical(this,o)) return true`, `\nreturn  ${s}`]) }
        , {
            namedParams: [], unnamedParams: [new Parameter({ name: "o", type: "Object" },)
            ]
        }, overrides)

    // const m = new Method("", "bool",, [], [], overrides)
    // return m
}

export { materialImport, keyParam, generateEquals, generateToString, generateBuildMethod, generateStatelessWidget }