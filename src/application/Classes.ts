import { inject } from '../framework';

export class Test1 {
  constructor() {
    console.log('Instantiating Test');
  }
}

export class Test2 {
  constructor(@inject('test') test: Test1) {
    console.log('Instantiating Test2');
  }
}

export class Test3 {
  constructor(@inject(Test1) test: Test1, @inject(Test2) test2: Test2) {
    console.log('Instantiating Test3');
  }
}

export class Test4 {
  constructor(@inject(Test1) test: Test1, @inject(Test2) test2: Test2, @inject(Test3) test3: Test3) {
    console.log('Instantiating Test4');
  }
}

export class Test5 {
  constructor(num: number, @inject(Test1) test: Test1, @inject(Test2) test2: Test2, str: string) {
    console.log('Instantiating Test5', test, test2, num, str);
  }
}

export type Test5Factory = (num: number, str: string) => Test5;

export const test6: { x: number, y: number } = { x: 6, y: 10 };
