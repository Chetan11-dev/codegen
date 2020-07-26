class Fruit {
  final String a;
  final String b;
  final String c;
  final String d;

  Fruit(this.a, this.b, {this.c, this.d});

  dynamic haveFruit(String a, String b, {String c, String d}) {
    a;
    b;
    c;
  }

  @override
  String toString() {
    return 'Fruit {a: $a, b: $b, c: $c, d: $d};';
  }

  bool operator ==(Object o) {
    if (identical(this, o)) return true;

    return o is Fruit && o.a == a && o.b == b && o.c == c && o.d == d;
  }
}

main(List<String> args) {
  final f = new Fruit(
    "a",
    "a",
  );

  print(f == f);
  print(f == null);
  print(f ==
      new Fruit(
        "a",
        "a",
      ));
  print(f ==
      new Fruit(
        "a",
        "b",
      ));
}
