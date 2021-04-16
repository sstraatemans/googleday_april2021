import { SocketEvent } from "../../types/sockets.types";

export function onSocketEvent<T extends SocketEvent>(
  socket: any,
  eventName: T["eventName"],
  callback: (arg: T["body"]) => void
) {
  socket.on(eventName, (args: T["body"]) => {
    console.log("Received event: ", eventName, JSON.stringify(args))
    callback(args);
  });
}
