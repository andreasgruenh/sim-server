import ConnectMessage from '../framework/communication/ConnectMessage';
import MessageHandler from '../framework/communication/MessageHandler';

class ConnectMessageHandler extends MessageHandler<ConnectMessage> {
  constructor() {
    super(ConnectMessage.type);
  }

  public handle(message: ConnectMessage) {
    console.log('connected!', message, message.type);
  }
}

export default ConnectMessageHandler;
