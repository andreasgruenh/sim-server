import IMessage from './IMessage';
import MessageHandler from './MessageHandler';

class MessageDispatcher {
  public static symbol = Symbol('MessageDispatcher');

  private messageHandlersByType = new Map<string, Array<MessageHandler<any>>>();

  public registerAll(messageHandlers: Array<MessageHandler<any>>) {
    for (const messageHandler of messageHandlers) {
      const type = messageHandler.getHandledMessageType();
      if (!this.messageHandlersByType.has(type)) this.messageHandlersByType.set(type, []);
      this.messageHandlersByType.get(type).push(messageHandler);
    }
  }

  public dispatch(message: IMessage) {
    const handlers = this.messageHandlersByType.get(message.type);
    if (!handlers) return;
    for (const handler of handlers) handler.handle(message);
  }
}

export default MessageDispatcher;
