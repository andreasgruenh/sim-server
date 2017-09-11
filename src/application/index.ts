import 'reflect-metadata';

import { Test4, Test5, Test5Factory, test6 } from './Classes';
import MainModule from './MainModule';

const container = new MainModule().getContainer();

container.get<Test4>(Test4);

container.get<Test5Factory>(Test5)(10, 'hello');

console.log(container.get('test6') === test6);
