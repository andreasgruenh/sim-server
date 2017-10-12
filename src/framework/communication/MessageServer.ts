import * as WebSocket from 'ws';

import inject from '../ioc/inject';
import injectAll from '../ioc/injectAll';
import ConnectMessage from './ConnectMessage';
import DisconnectMessage from './DisconnectMessage';
import IMessage from './IMessage';
import MessageDispatcher from './MessageDispatcher';
import MessageHandler from './MessageHandler';

class MessageServer {
  public static symbol = Symbol('MessageServer');
  private dispatcher: MessageDispatcher;
  private wss: WebSocket.Server;
  private createConnectMessage: () => ConnectMessage;
  private createDisconnectMessage: () => DisconnectMessage;

  constructor(
    @inject(MessageDispatcher.symbol) dispatcher: MessageDispatcher,
    @inject(ConnectMessage.symbol) createConnectMessage: () => ConnectMessage,
    @inject(DisconnectMessage.symbol) createDisconnectMessage: () => DisconnectMessage,
    @injectAll(MessageHandler.symbol) messageHandlers: Array<MessageHandler<any>>,
  ) {
    this.dispatcher = dispatcher;
    this.dispatcher.registerAll(messageHandlers);
    this.createConnectMessage = createConnectMessage;
    this.createDisconnectMessage = createDisconnectMessage;
  }

  public start(options: { port: number }) {
    this.wss = new WebSocket.Server({ port: options.port });
    this.wss.on('connection', socket => {
      this.dispatcher.dispatch(this.createConnectMessage());
      socket.on('message', data => {
        const message = JSON.parse(data.toString()) as IMessage;
        this.dispatcher.dispatch(message);
      });
      socket.on('close', () => {
        this.dispatcher.dispatch(this.createDisconnectMessage());
      });
    });
  }
}

export default MessageServer;
