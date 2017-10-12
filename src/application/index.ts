import 'reflect-metadata';

import App from './App';
import MainModule from './MainModule';

const container = new MainModule().getContainer();

container.get(App.symbol);
