import { between, line, NEW_LINE } from './utils'

export class Emmiter {

    // content: string = ""
    private defaultindent: string = '\t'
    private ls: string[] = []

    public get content(): string {
        return between(this.ls, "")
    }

    public get last(): string {
        return this.ls[this.ls.length - 1]
    }

    private add(param: string) {
        this.ls.push(param)
        // this.content = this.content + params
    }


    // emitAtTop(params: string) {
    //     this.content = params + '\n' + this.content
    // }

    // surround(content = "", start = "{", end = "}") {
    //     this.emit(start)

    //     this.emit(end)
    // }

    // indent(s: string) {
    //     var rs = (s.split('\n'))
    //     const r = rs.pop()

    //     rs = rs.map(str => { return this.defaultindent + str + "\n" })

    //     rs.push(r as string)

    //     return between(rs, '')
    // }

    reset() {
        this.ls = []
    }

    // indentAll() {
    //     this.content = (this.indent(this.content))
    // }

    emitLine() {
        this.add(line())
    }

    emitWithIndent(content: string) {
        throw new Error('Method not implemented.')
        // const e = this.createNewEmmiter()
        // f(e)
        // this.add(this.indent(e.content))
    }
    // emit with a new line  
    emit(s: string, shouldAddNewLine = true) {
        this.add(s + (shouldAddNewLine ? NEW_LINE : ""))
    }

    emitNoLine(s: string) {
        this.emit(s, false)
    }
}
