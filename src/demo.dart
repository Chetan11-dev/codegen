import 'package:flutter/material.dart';

class Fruit extends StatefulWidget {
  final String a;
  final String b;
  final String c;
  final String d;

  Fruit(this.a, this.b, {this.c, this.d, Key key}) : super(key: key);

  @override
  bool operator ==(Object o) {
    if (identical(this, o)) return true;

    return o is Fruit && o.a == a && o.b == b && o.c == c && o.d == d;
  }

  @override
  String toString() {
    return 'Fruit {a: $a, b: $b, c: $c, d: $d}';
  }

  @override
  _FruitState createState() {
    return _FruitState();
  }
}

class _FruitState extends State<Fruit> {
  @override
  Widget build(BuildContext context) {
    return Container(
      child: Text("Hello from Fruit"),
    );
  }
}
