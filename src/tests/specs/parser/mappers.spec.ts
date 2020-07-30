import { mapParams, AggregateParam, copyFeildsToConstructore, seperateParams } from './mappers'
import { logCode, log } from '../../testutils'

describe('test mappers', () => {
    test('should map params', () => {
        const p0 = mapParams({ name: "a", type: "String" }, ['r', '!r'], { final: true, named: true, required: false })
        const p1 = mapParams({ name: "a", type: "String" }, ['r', '!r', '!f',], { final: true, named: true, required: false })
        const p2 = mapParams({ name: "a", type: "String" }, ['r', '!r', '!f', '!n', 'r'], { final: true, named: true, required: false })
        var ps = [p0, p1, p2]
        // logPS(ps)
        ps = copyFeildsToConstructore(ps)
        // logPS(ps)
        console.log(seperateParams(ps).namedParams, seperateParams(ps).unnamedParams)
        // logPS(ps)

    })
})

function logPS(ps: AggregateParam[]) {
    console.log(...ps)
    // ps.forEach(p => {

    //     log(p.param)
    // })
}