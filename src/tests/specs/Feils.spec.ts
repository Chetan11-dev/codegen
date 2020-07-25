import { Field, Code } from '../../core/codegen/Base'
import { equalsDart, strings } from './testutils'
export { }

test('should emit correct field', () => {
    const f = new Field("fruit", "String", "const")

    equalsDart(f, "const String fruit;\n")
})

test('Code test', () => {
    const c = new Code(strings)
    expect(c.code).toBe("a\nb\nc\n")
})