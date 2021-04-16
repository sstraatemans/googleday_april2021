import { useEffect, useState } from "react";
import { useSocket } from "use-socketio";
import { SocketEvent } from "../../types/sockets.types";

type LastMessageState<T extends SocketEvent> = {
  value: T["response"] | null;
  __lastUpdatedAt: number | null;
};

export function useLastMessage<T extends SocketEvent>(
  eventName: T["eventName"],
  callback: (state: LastMessageState<T>) => void
) {
  const [state, setState] = useState<LastMessageState<T>>({
    value: null,
    __lastUpdatedAt: null,
  });

  useSocket(eventName, (args) => {
    setState({
      value: args,
      __lastUpdatedAt: new Date().getTime(),
    });
  });

  useEffect(() => {
    console.log(eventName, state);

    callback(state);
  }, [state]);

  return state;
}
