import IMessage from './IMessage';

class DisconnectMessage implements IMessage {
  public static symbol = Symbol('DisconnectMessage');
  public static type = 'DISCONNECT_MESSAGE';
  public type = DisconnectMessage.type;
}

export default DisconnectMessage;
