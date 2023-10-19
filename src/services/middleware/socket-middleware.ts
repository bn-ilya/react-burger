import { type MiddlewareAPI, type Middleware } from 'redux';

import { IWsActions } from '../../utils/types';

import { AppDispatch, RootState, TAllAppActions } from '../reducers';
import { updateToken } from '../reducers/profile';

export const socketMiddleware = <T extends IWsActions>(wsUrl: string, actions: T): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    return (next) => (action: TAllAppActions) => {
      const { dispatch } = store;

      const { init, send, close, onsuccess, onerror, onmessage, onclose } = actions;

      if (action.type === init.type) {
        socket = action.payload
          ? new WebSocket(`${wsUrl}?token=${action.payload}`)
          : new WebSocket(wsUrl);
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
          if (data === 'Invalid or missing token') {
            dispatch(updateToken());
          } else {
            dispatch(onmessage(JSON.parse(data)));
          }
        };

        socket.onclose = () => {
          dispatch(onclose());
        };

        if (action.type === send.type) {
          const message = action.payload;
          socket.send(JSON.stringify(message));
        }
        if (action.type === close.type) {
          socket.close(1000, 'работа закончена');
        }
      }

      next(action);
    };
  }) as Middleware;
};
