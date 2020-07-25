import { Field, Spec, CodeGenerator } from './Base'
import { Emmiter } from '../../core/core/emmiter'
import { equalsDart } from './testutils'
export { }

test('should emit correct field', () => {
    const f = new Field("fruit", "String", "const")
    equalsDart(f, "const String fruit;\n")
})

