import { createAction } from 'typesafe-actions'
import { SocketInfo } from '../../types'

export const subscribe = createAction('SUBSCRIBE', action => () => action())
export const subscribeToSocket = createAction('SUBSCRIBE_TO_SOCKET', action => (url: string) => action(url))
export const subscribeSuccess = createAction('SUBSCRIBE_SUCCESS', action => (res: WebSocket) => action(res))
export const subscribeError = createAction('SUBSCRIBE_ERROR', action => (error: Error) => action(error))

export const socketMessage = createAction('SOCKET_MESSAGE', action => (serverTime: number) => action(serverTime))
export const socketError = createAction('SOCKET_ERROR', action => (error: Error) => action(error))
export const socketOpened = createAction('SOCKET_OPENED', action => (socketInfo: SocketInfo) => action(socketInfo))
export const socketClosed = createAction('SOCKET_CLOSED', action => (code: number) => action(code))
export const socketTimeout = createAction('SOCKET_TIMEOUT', action => () => action())
export const socketDisconnect = createAction('SOCKET_DISCONNECT', action => () => action())
