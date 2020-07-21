/* eslint-disable no-throw-literal */

function makeProperties(gen: Gen) {
    const ls = gen.props.map(p => {
        return gen.serveProp(p)
    })

    return between(ls, '\n')
}

export function between(ls: string[], between = ", ") {
    return ls.reduce((r, rs) => r + between + rs)
}



export
    function orchestra() {
    // class gen 
    // with Class name, Options List
    const gen = new JavaGen('Fruit', [{ type: 'string', name: "name" }],)
    // get and change property by orchestra   

    // first for each option call Gen.serveProp map to str seperated with \n  

    // append with line 

    const innercontent: string = makeProperties(gen)
    // for each option call coressponding function 


    // wrap in class 
    const finalClass = gen.wrapper(innercontent)
    // log output 
    console.log(finalClass)
}

class JavaMapper { }


interface Prop {
    type: string
    name: string
}

interface Option {
    desc: string
    shouldDo: boolean
    onChange(classname: string, ps: Prop[]): string
}

export abstract class Gen {
    className: string
    props: Prop[]
    options: Option[]

    constructor(name: string
        , props: Prop[], options: Option[]) {
        this.className = name
        this.props = props
        this.options = options
    }

    changeOption(argsoption: Option) {
        const i = this.options.findIndex(option => {
            if (argsoption.desc === option.desc) {
                return true
            }
            else
                return false
        })

        if (i) {
            this.options[i] = argsoption
        } else throw "Not Found"
    }

    abstract wrapper(content: string): string
    abstract serveProp(prop: Prop): string

    hash(classname: string, ps: Prop[]) {
        return ""
    }

    toString(classname: string, ps: Prop[]) {
        return ""
    }
}


class JavaGen extends Gen {
    getOptions(): Option[] {
        return [
            // { desc: 'Generate toString', onChange: , shouldDo: true }
            ]
    }


    toString(classname: string, ps: Prop[]) {

        const temp = `@Override\npublic String toString() {\n\treturn "${classname}{" \n'}';\n}`
        //     const template = `@Override
        //     public String toString() {
        //         return "classs{" +
        //                 "name='" + name + '\'' +
        //                 ", classaa='" + classaa + '\'' +
        //                 '}';
        //     }
        // `

        ps.map(p => p.name)

        return `${classname}{}`
    }

    constructor(name: string
        , props: Prop[]) {
        super(name, props, [])

        this.options = this.getOptions()
    }

    wrapper(content: string): string {
        return `Class ${this.className} {\n${content}\n}`
    }

    serveProp(prop: Prop): string {
        return `${prop.type} ${prop.name} ;`
    }
}


test('should ', () => {
    // orchestra()
})