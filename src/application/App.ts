import MessageServer from '../framework/communication/MessageServer';
import { inject } from '../framework/index';

class App {
  public static symbol = Symbol('App');

  constructor(
    @inject(MessageServer.symbol) messageServer: MessageServer,
  ) {
    messageServer.start({ port: 8081 });
  }
}

export default App;
