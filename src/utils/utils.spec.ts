import { between } from './utils'

test('inbetween test ', () => {
    expect(between(['a', 'b', 'c'])).toBe("a, b, c")
})
