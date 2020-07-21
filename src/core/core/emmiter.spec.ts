import { between } from './gen.spec'

it('should ', () => {
    const e = new Emmiter()
    e.emit("private const appple ; ")

    e.emit("emitAtTop(params: string) {")
    e.emitWithIndent(em => { em.emit("this.content = params + this.content") })
    e.emit("}")

    e.indentAll()
    e.surround("class Apple{")

    // Count spaces and tabs
    // Char count test 
    expect(char_count("ababa", "b"),).toBe(2)

    expect(char_count(e.content, '\n')).toBe(6)
    expect(char_count(e.content, '\t')).toBe(5)


    // console.log("----\n" + e.content + "--------")
})

function char_count(str: string, letter: string) {
    var letter_Count = 0
    for (var position = 0; position < str.length; position++) {
        if (str.charAt(position) == letter) {
            letter_Count += 1
        }
    }
    return letter_Count
}


export
    class Emmiter {
    content: string = ""
    defaultindent: string = '\t'

    private add(params: string) {
        this.content = this.content + params
    }

    emitAtTop(params: string) {
        this.content = params + '\n' + this.content
    }
    surround(start = "{", end = "}") {
        this.emitAtTop(start)
        this.emit(end)
    }

    indent(s: string) {
        var rs = (s.split('\n'))
        const r = rs.pop()

        rs = rs.map(str => { return this.defaultindent + str + "\n" })

        rs.push(r as string)

        return between(rs, '')
    }

    reset() { this.content = '' }

    indentAll() {
        this.content = (this.indent(this.content))
    }


    emitLine() {
        this.add("\n")
    }

    createNewEmmiter() {
        return new Emmiter()
    }

    emitWithIndent(f: (e: Emmiter) => void) {
        const e = this.createNewEmmiter()
        f(e)
        this.add(this.indent(e.content))
    }

    emit(s: string) {
        this.add(s + '\n')
    }
}