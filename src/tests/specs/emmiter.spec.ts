import { Emmiter } from '../../core/codegen/emmiter'

import { line } from '../../utils/utils'

it('emitter test ', () => {

    const content = "private const appple ;"
    const newContent = line(content)

    const e = new Emmiter()
    e.emit(content)
    expect(e.last).toBe(newContent)
    // console.log(e)
    expect(e.content).toBe(newContent)
})



    // e.emit("emitAtTop(params: string) {")
    // e.emitWithIndent(em => { em.emit("this.content = params + this.content") })
    // e.emit("}")

    // e.indentAll()
    // e.surround("class Apple{")

    // // Count spaces and tabs
    // // Char count test 
    // expect(char_count("ababa", "b"),).toBe(2)

    // expect(char_count(e.content, '\n')).toBe(6)
    // expect(char_count(e.content, '\t')).toBe(5)
    // e.makeToString(e.className, e.props)
