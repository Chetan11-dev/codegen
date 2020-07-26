import { generateStatelessWidget } from '../../core/codegen/extensions'
import { equalsDart, logCode } from '../testutils'


test('should generate coreect statelesswidget', () => {
    const cl = generateStatelessWidget("Fruit", { generateEquals: true, generatetoString: true })
    logCode(cl, false)
    logCode(cl, true)
    // equalsDart(cl, "", true)
})
