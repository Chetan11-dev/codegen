class Fruit {
  final String c;
  final String d;
  final String a;
  final String b;

  Fruit(this.a, this.b, {this.c, this.d});

  @override
  String toString() {
    return 'Fruit {c: $c, d: $d, a: $a, b: $b};';
  }

  @override
  bool operator ==(Object o) {
    if (identical(this, o)) return true;

    return o is Fruit && o.c == c && o.d == d && o.a == a && o.b == b;
  }
}
