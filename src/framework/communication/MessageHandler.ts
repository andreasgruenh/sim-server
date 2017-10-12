import IMessage from './IMessage';
abstract class MessageHandler<MessageType extends IMessage> {
  public static symbol = Symbol('MessageHandler');

  private type: string;

  constructor(handledType: string) {
    this.type = handledType;
  }

  public getHandledMessageType = () => this.type;

  public abstract handle(message: MessageType): void;
}

export default MessageHandler;
