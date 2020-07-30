import { parse, findNextClassFeild } from './parser'
import { splitEOL } from "./splitEOL"
import { multiplespacesToSingle as multiplespacesToSingleTrim } from '../../../utils/utils'
import { isEmpty } from '../../../utils/tsUtils'


export interface Line {
    num: number,
    text: string
}

function cleanInput(text: string): Line[] {
    var t = splitEOL(text).map((s, i) => {
        return ({ num: i + 1, text: multiplespacesToSingleTrim(s) })
    })
    // console.log(t)
    t = t.filter(a => {
        return !isEmpty(a.text)
    })
    // console.log(a)
    return t
}

describe('parse cases', () => {

    test('should parse', () => {
        const text = `make cl Apple 
                      meths 
                      i getApples
                      i getMango 
                      params 
                      d getPineApples 
                      i getPineApple [f  n  !n !f f r]
        `

        const i = cleanInput(text)
        // console.log(parse(i))

    })


    test('should parse func', () => {
        const text = `make func
                      d getPineApples 
                      i getPineApple [f  n  !n !f f r]
        `

        const i = cleanInput(text)
        console.log(parse(i))

    })



    // test('should not parse', () => {


    //     const text = `
    // make cl 
    // meth 
    // `;
    //     // console.log(findNextClassFeild('meths'))
    //     const i = cleanInput(text);
    //     // console.log(i)
    //     // parse(i)


    // });
    // test('should text classfeild', () => {
    //     expect(findNextClassFeild('meths')).toBeDefined()
    //     expect(findNextClassFeild('meth  s')).not.toBeDefined()
    //     expect(findNextClassFeild('params')).toBeDefined()

    // })

})
