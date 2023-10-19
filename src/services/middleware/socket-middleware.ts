import { type MiddlewareAPI, type Middleware } from 'redux';

import { IWsActions } from '../../utils/types';

import { AppDispatch, RootState, TAllAppActions } from '../reducers';

export const socketMiddleware = <T extends IWsActions>(wsUrl: string, actions: T): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    return (next) => (action: TAllAppActions) => {
      const { dispatch } = store;

      const { init, send, onsuccess, onerror, onmessage, onclose } = actions;

      if (action.type === init.type) {
        socket = new WebSocket(wsUrl);
      }
      if (socket) {
        socket.onopen = () => {
          dispatch(onsuccess());
        };

        socket.onerror = (event) => {
          dispatch(onerror(event));
        };

        socket.onmessage = (event) => {
          const { data } = event;
          dispatch(onmessage(JSON.parse(data)));
        };

        socket.onclose = () => {
          dispatch(onclose());
        };

        if (action.type === send.type) {
          const message = action.payload;
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  }) as Middleware;
};
