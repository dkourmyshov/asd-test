import { Subject, of, merge, empty } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { WebSocketSubject } from 'rxjs/webSocket'
import { mergeMap, switchMap, map, filter, retryWhen, catchError, timeout, takeUntil } from 'rxjs/operators'
import { combineEpics } from 'redux-observable'
import { isActionOf } from 'typesafe-actions'
import { API, thirdTimesACharm } from './common'

import { InstaEpic } from '../../types'
import actions from '../actions'
import { ServerTimeMessage } from '../../types'

const ENDPOINT = '/subscribe'

const subscribeEpic: InstaEpic = (action$, state$) => action$.pipe(
    filter(isActionOf(actions.subscribe)),
    mergeMap(action =>
        ajax({ url: `${API}${ENDPOINT}`, headers: { 'x-test-app-jwt-token': state$.value.jwtToken } }).pipe(
            map(ajaxResponse => actions.subscribeToSocket(ajaxResponse.response.url)),
            retryWhen(thirdTimesACharm),
            catchError(error => {
                if (error.name === 'AjaxError' && error.code === 401) {
                    return of(actions.logout())
                }
                return of(actions.subscribeError(error));
            })
        )
    )
)

const subscribeToSocketEpic: InstaEpic = action$ => action$.pipe(
    filter(isActionOf(actions.subscribeToSocket)),
    switchMap(action => {
        const open$ = new Subject()
        const close$: Subject<CloseEvent> = new Subject()
        const message$ = new WebSocketSubject<ServerTimeMessage>({
            url: action.payload,
            openObserver: open$,
            closeObserver: close$
        })

        const messageAction$ = message$.pipe(
            map(data => actions.socketMessage(data.server_time)),
            // dispatch no further actions if the socket is already disconnected for any reason
            takeUntil(action$.pipe(filter(isActionOf(actions.socketClosed)))),
            // According to the specs, we should receive a new message every 500 ms on average,
            // but does not define what should happen if we do not;
            // so I give server a grace period of additional 1000 ms, after which we're
            // trying to reconnect even if server has not disconnected.
            timeout(2000), 
            catchError(error => {
                if (error.name === 'TimeoutError') {
                    return of(actions.socketDisconnect()) 
                } else {
                    return of(actions.socketError(error))
                }
            }) 
        )

        const openAction$ = open$.pipe(map(() => actions.socketOpened(message$, close$)))
        const closeAction$ = close$.pipe(map(event => actions.socketClosed(event.code)))

        return merge(messageAction$, openAction$, closeAction$) 
    })
)

const disconnectEpic: InstaEpic = (action$, state$) => action$.pipe(
    filter(isActionOf(actions.socketDisconnect)),
    mergeMap(() => {
        if (state$.value.socket !== null) {
            const {message$, close$} = state$.value.socket
            message$.complete()
            close$.complete()
            return of(actions.socketClosed(0))
        }
        if (state$.value.loggedIn) {
            return of(actions.subscribe()) // if socket was already disconnected (e.g. connect attempt failed), try to reconnect
        }
        return empty() // dispatch no further actions if for some reason socker is already disconnected and we're logged out
    })
)

const reconnectEpic: InstaEpic = (action$, state$) => action$.pipe(
    filter(isActionOf(actions.socketClosed)),
    filter(() => state$.value.loggedIn),
    map(action =>
            action.payload === 1006
            /* socket closed by client, most probably due an error during socket creation */
                ? actions.logout()
                : actions.subscribe()
        
    )
)

export default combineEpics(subscribeEpic, subscribeToSocketEpic, disconnectEpic, reconnectEpic)