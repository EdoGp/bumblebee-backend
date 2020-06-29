import {
	SubscribeMessage,
	WebSocketGateway,
	OnGatewayInit,
	WsResponse,
	WebSocketServer,
	OnGatewayConnection,
	OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server, Client } from 'socket.io';

@WebSocketGateway()
export class AppGateway
	implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer() wss: Server;
	private logger: Logger = new Logger('AppGateway');

	private url = `adsad`;

	afterInit(server: Server) {
		this.logger.log('Initialized socket server');
		this.wss.clients;
	}

	handleDisconnect(client: Socket) {
		// throw new Error('Method not implemented.');
		this.logger.log(`Client disconnected: ${client.id}`);
	}
	handleConnection(client: Socket, ...args: any[]) {
		// throw new Error('Method not implemented.');
		this.logger.log(`Client connected: ${client.id}`);
	}

	@SubscribeMessage('messageToServer')
	handleMessage(client: Socket, text: string): WsResponse<string> {
		// this.wss.emit('msgToClient', text);
		// client.emit('msgToClient', text);
		return { event: 'msgToClient', data: 'Hello world!' };
	}
}
