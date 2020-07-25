import { Field, Spec, CodeGenerator } from '../../core/codegen/Base'
import { Emmiter } from '../../core/codegen/emmiter'
import { equalsDart } from './testutils'
export { }

test('should emit correct field', () => {
    const f = new Field("fruit", "String", "const")

    equalsDart(f, "const String fruit;\n")
})

