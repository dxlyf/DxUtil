type Options = Array<any>;
interface Class {
  new (...args: Options): Class;
  extend();
  initialize(args: Options);
}

class Class implements Class {
  constructor(...args: Options) {}
  initialize(...args: Options) {}
  static extend<T extends Object>(proto: T): { new (): Class } {
    var parent: Class = this as Class;
    class SubClass extends Class {
      constructor(...args: Options) {
        super(...args);
        if (this.initialize) {
          this.initialize(...args);
        }
      }
    }

    return SubClass;
  }
}
export default Class;
