class Apple {
  int getPineApple;
  double getPineApples;

  Apple(@required this.getPineApple, {this.getPineApples});

  int getApples() {
    print('Hello from getApples');
  }

  int getMango() {
    print('Hello from getMango');
  }

  @override
  bool operator ==(Object o) {
    if (identical(this, o)) return true;

    return o is Apple &&
        o.getPineApple == getPineApple &&
        o.getPineApples == getPineApples;
  }

  @override
  String toString() {
    return 'Apple {getPineApple: $getPineApple, getPineApples: $getPineApples}';
  }
}
