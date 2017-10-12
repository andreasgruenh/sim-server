import { AbstractModule, FrameworkModule } from '../framework';
import MessageHandler from '../framework/communication/MessageHandler';
import App from './App';
import ConnectMessageHandler from './ConnectMessageHandler';

export default class MainModule extends AbstractModule {

  public configure(): void {
    this.loadModule(new FrameworkModule());
    this.bind(App.symbol).toClass(App);
    this.bind(MessageHandler.symbol).toClass(ConnectMessageHandler);
  }
}
