import { AbstractModule } from './';
import ConnectMessage from './communication/ConnectMessage';
import DisconnectMessage from './communication/DisconnectMessage';
import MessageDispatcher from './communication/MessageDispatcher';
import MessageServer from './communication/MessageServer';

class FrameworkModule extends AbstractModule {
  public configure() {
    this.bind(MessageServer.symbol).toClass(MessageServer);
    this.bind(MessageDispatcher.symbol).toClass(MessageDispatcher);
    this.bind(ConnectMessage.symbol).toFactory(ConnectMessage);
    this.bind(DisconnectMessage.symbol).toFactory(DisconnectMessage);
  }
}

export default FrameworkModule;
