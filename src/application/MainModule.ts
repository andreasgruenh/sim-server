import { Module } from '../framework';
import { Test1, Test2, Test3, Test4, Test5, test6 } from './Classes';

class SubModule extends Module {
  public configure(): void {
    this.bind(Test1).toSelf();
    this.bind(Test2).toSelf();
    this.bind('test').toClass(Test1);
    this.bind(Test5).toFactory(Test5);
    this.bind('test6').toValue(test6);
  }
}

export default class MainModule extends Module {
  public configure(): void {
    this.bind(Test3).toSelf().asEagerSingleton();
    this.bind(Test4).toSelf();
    this.loadModule(new SubModule());
  }
}
