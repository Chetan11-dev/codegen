class Apple extends StatefulWidget {
  App({Key key}) : super(key: key);

  @override
  _AppState createState() => _AppState();
}
    class Fruit extends Veg {
       final String a;
       final String b;
       final String c;
       final String d;
    
       Fruit(this.a, this.b,{this.c, this.d, Key key, Key keya}) : super(key : key, keya : keya);
    
    }
    
    
class _AppState extends State<App> {
  @override
  Widget build(BuildContext context) {
    return Container(
       child: child,
    );
  }
}