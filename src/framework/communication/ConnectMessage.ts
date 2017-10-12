import IMessage from './IMessage';

class ConnectMessage implements IMessage {
  public static symbol = Symbol('ConnectMessage');
  public static type = 'CONNECT_MESSAGE';
  public type = ConnectMessage.type;
}

export default ConnectMessage;
