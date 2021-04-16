import { SocketEvent } from "../../types/sockets.types";

export function socketEmit<T extends SocketEvent>(
  socket: any,
  eventName: T["eventName"],
  body: T["body"]
) {
  console.log(`socketEvent[${eventName}] >> `, body);
  socket.emit(eventName, body);
}
