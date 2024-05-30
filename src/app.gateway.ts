import {
  WebSocketGateway,
  OnGatewayConnection,
  WebSocketServer,
  ConnectedSocket,
  MessageBody,
  SubscribeMessage
} from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateRequestCommand } from "./request/commands/create-request.command";
import { Client } from "socket.io/dist/client";
import { GetRequestsQuery } from "./request/queries/get-requests.query";
import { UpdateRequestCommand } from "./request/commands/update-request.command";
import { GetFilteredRequestsQuery } from "./request/queries/get-filtered-requests.query";

@WebSocketGateway({cors: {origin: true}})
export class AppGateway{
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {
  }
  @WebSocketServer()
  server: Server;

  // @SubscribeMessage('ping')
  // async handlePing(client: Socket, data: string) {
  //   console.log(data)
  //   const type = JSON.parse(data).event
  //   if(type === 'ping') {
  //     //client.emit('rec2', data)
  //       this.server.emit('rec2', data)
  //   }
  //   else {
  //     const request = await this.commandBus.execute(new CreateRequestCommand(JSON.parse(data).payload))
  //     const json = JSON.stringify(request)
  //     this.server.emit('rec', json)
  //     console.log(data)
  //     return data
  //   }
  //
  //   // console.log(client)
  //   // return JSON.parse(client)
  // }


  @SubscribeMessage('TAKE_REQUEST')
  async takeRequest(client: Socket, data: string) {
    const request  = JSON.parse(data)  //{requestId, adminId}
    //@ts-ignore
    await this.commandBus.execute(new UpdateRequestCommand({id: request.id, adminId: request.adminId, isSelected: request?.isSelected, isCompleted: request?.isCompleted}))
    client.emit('TAKE_REQUEST', JSON.stringify(request))
  }

  @SubscribeMessage('FILTER_REQUESTS')
  async filterRequest(client: Socket, data: string) {
    const filter = JSON.parse(data)
    const requests = await this.queryBus.execute(new GetFilteredRequestsQuery(filter))
    client.emit('FILTER_REQUESTS', JSON.stringify(requests))
  }

  @SubscribeMessage('CREATE_REQUEST')
  async createRequest(client: Socket, data: string) {
    console.log(data)
    const request = await this.commandBus.execute(new CreateRequestCommand(JSON.parse(data)))
    const json = JSON.stringify(request)
    client.emit('CREATE_REQUEST', json)
  }

  @SubscribeMessage('GET_REQUEST')
  async getRequest(client: Socket, data: string) {
    const requests = await this.queryBus.execute(new GetRequestsQuery())

    client.emit('GET_REQUEST', JSON.stringify(requests))
  }

  // @SubscribeMessage('message')
  // async handleMessage(client: Socket, data: string) {
  //
  //     const request = await this.commandBus.execute(new CreateRequestCommand(JSON.parse(data).payload))
  //     const json = JSON.stringify(request)
  //     this.server.emit('rec', json)
  //     console.log(data)
  //     return data
  //
  //
  //   // console.log(client)
  //   // return JSON.parse(client)
  // }
  afterInit(server: Server) {
    console.log(server);
    //Выполняем действия
  }

  handleDisconnect(client: Socket) {
    console.log(`Disconnected: ${client.id}`);
    //Выполняем действия
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Connected ${client.id}`);
    //Выполняем действия
  }

  // sendMessageToUser( message: any) {
  //  this.server.emit('newMessdage2', message)
  // }

  // Example usage: could be triggered by some service logic
  // handleDatabaseChange(  data: any) {
  //   this.sendMessageToUser(data);
  // }
}





// import { WebSocketGateway, OnGatewayConnection, WebSocketServer, ConnectedSocket, MessageBody } from '@nestjs/websockets';
// import { Server, Socket } from 'socket.io';
//
// @WebSocketGateway({cors: {origin: true}})
// export class AppGateway implements OnGatewayConnection {
//   @WebSocketServer()
//   server: Server;
//
//   private users = new Map<string, Socket>();
//
//   handleConnection(client: Socket, ...args: any[]) {
//     const token = client.handshake.query.id as string;
//     // Decode token and retrieve user identifier, then associate with the client
//     this.users.set(token, client);
//     console.log(token)
//   }
//
//   handleDisconnect(client: Socket) {
//     this.users.forEach((value, key) => {
//       if (value === client) {
//         this.users.delete(key);
//       }
//     });
//   }
//
//   sendMessageToUser(userId: string, message: any) {
//     const client = this.users.get(userId);
//     if (client) {
//       client.emit('message', message);
//     }
//   }
//
//   // Example usage: could be triggered by some service logic
//   handleDatabaseChange(userId: string, data: any) {
//     this.sendMessageToUser(userId, data);
//   }
// }
//









