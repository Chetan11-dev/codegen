// takes make   func  r !r  n !n => func  , r !r  n !n

//  Gives exact matching regex

export function exactMatchRegex(s: string) {
    return new RegExp(`^\\b${s}\\b$`)
}

// make   func  r !r  n !n => func  , r !r  n !n
const matchDeclaration = regex(/^make\s+(\bcl\b|\bfunc\b)(.*)/)
// param => param
const matchParam = regex(exactMatchRegex('params'))
// func => func
const matchMeth = regex(exactMatchRegex('meth'))
// i s ff => i,s ,ff
const argsCapture = regex(/^(s|d|i|d)\s+(\w+)(.*)?/)


function regex(r: RegExp) {
    return (s: string) => (r.exec(s))
}

describe('should test interactions', () => {
    it('should match class or func idetifier', () => {
        expect(matchDeclaration(`make   func  r !r  n !n`)).not.toBeNull()
        expect(matchDeclaration(`make func`)).not.toBeNull()
        expect(matchDeclaration(`makefunc`)).toBeNull()
        expect(matchDeclaration(`make funcs`)).toBeNull()
    })

    it('should match Param and feild', () => {
        expect(matchParam(`params`)).not.toBeNull()
        expect(matchMeth(`meth`)).not.toBeNull()
        expect(matchParam(`param`)).toBeNull()
        expect(matchMeth(`meth A`)).toBeNull()
    })


    it('should capture args properly', () => {
        expect(argsCapture(`i s ff  , f  , d`)).not.toBeNull()
        expect(argsCapture(`i s`)).not.toBeNull()
        expect(argsCapture(`param s`)).toBeNull()
        expect(argsCapture(`meth A`)).toBeNull()
    })

})
