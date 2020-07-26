import { generateStatelessWidget, generateStatefullWidget } from '../../core/codegen/extensions'
import { equalsDart, logCode } from '../testutils'
import { namedParams, unnamedParams } from "../shared/shared"

test('should generate coreect statelesswidget', () => {
    const cl = generateStatelessWidget("Fruit", { generateEquals: true, generatetoString: true }, namedParams, unnamedParams)
    const ex: string = "import 'package:flutter/material.dart';\n" +
        '\n' +
        'class Fruit extends StatelessWidget {\n' +
        '   final String a;\n' +
        '   final String b;\n' +
        '   final String c;\n' +
        '   final String d;\n' +
        '\n' +
        '   Fruit(this.a, this.b,{this.c, this.d, Key key}) : super(key : key);\n' +
        '\n' +
        '   @override\n' +
        '   Widget build(BuildContext context){\n' +
        '      return Container(child: Text("Hello from Fruit"),);\n' +
        '   }\n' +
        '\n' +
        '   @override\n' +
        '   bool operator ==(Object o){\n' +
        '      if (identical(this,o)) return true;\n' +
        '\n' +
        '      return  o is Fruit && o.a == a && o.b == b && o.c == c && o.d == d;\n' +
        '   }\n' +
        '\n' +
        '   @override\n' +
        '   String toString(){\n' +
        "      return 'Fruit {a: $a, b: $b, c: $c, d: $d}';\n" +
        '   }\n' +
        '\n' +
        '}\n'
    equalsDart(cl, ex,)
})

test('should generate coreect statelefulwidget', () => {
    const cl = generateStatefullWidget("Fruit", { generateEquals: true, generatetoString: true }, namedParams, unnamedParams)
    const ex0: string =
        "import 'package:flutter/material.dart';\n" +
        '\n' +
        'class Fruit extends StatefulWidget {\n' +
        '   final String a;\n' +
        '   final String b;\n' +
        '   final String c;\n' +
        '   final String d;\n' +
        '\n' +
        '   Fruit(this.a, this.b,{this.c, this.d, Key key}) : super(key : key);\n' +
        '\n' +
        '   @override\n' +
        '   bool operator ==(Object o){\n' +
        '      if (identical(this,o)) return true;\n' +
        '\n' +
        '      return  o is Fruit && o.a == a && o.b == b && o.c == c && o.d == d;\n' +
        '   }\n' +
        '\n' +
        '   @override\n' +
        '   String toString(){\n' +
        "      return 'Fruit {a: $a, b: $b, c: $c, d: $d}';\n" +
        '   }\n' +
        '\n' +
        '   @override\n' +
        '   _FruitState createState(){\n' +
        '      return _FruitState();\n' +
        '   }\n' +
        '\n' +
        '}\n'

    const ex1 =
        'class _FruitState extends State<Fruit> {\n' +
        '\n' +
        '   @override\n' +
        '   Widget build(BuildContext context){\n' +
        '      return Container(child: Text("Hello from Fruit"),);\n' +
        '   }\n' +
        '\n' +
        '}\n'
    equalsDart(cl[0], ex0,)
    equalsDart(cl[1], ex1,)
})