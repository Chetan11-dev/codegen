// takes make   func  r !r  n !n => func  , r !r  n !n
import { matchParam, matchMeth, argsCapture, matchDeclaration } from './matchDeclaration'

describe('should test interactions', () => {
    it('should match class or func idetifier', () => {
        expect(matchDeclaration(`make  func  r !r  n !n`)).not.toBeNull()
        expect(matchDeclaration(`make func`)).not.toBeNull()
        expect(matchDeclaration(`makefunc`)).toBeNull()
        expect(matchDeclaration(`make funcs`)).toBeNull()
    })

    it('should match Param and feild', () => {
        expect(matchParam(`params`)).not.toBeNull()
        expect(matchMeth(`meths`)).not.toBeNull()
        expect(matchParam(`param`)).toBeNull()
        expect(matchMeth(`meth A`)).toBeNull()
    })


    it('should capture args properly', () => {
        expect(argsCapture(`i s ff  , f  , d`)).not.toBeNull()
        expect(argsCapture(`i s`)).not.toBeNull()
        expect(argsCapture(`param s`)).toBeNull()
        expect(argsCapture(`meths A`)).toBeNull()
    })

})
