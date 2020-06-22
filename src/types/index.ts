/* store - actions */
import { ActionType } from 'typesafe-actions' 
/* store - reducers */
import { Subject } from 'rxjs'
import { WebSocketSubject } from 'rxjs/webSocket'
/* store - epics */
import { Epic } from 'redux-observable'
/* containers */
import { Dispatch } from 'redux'
import actions from '../store/actions'


export type ServerTimeMessage = {server_time: number}

export type httpError = ({name: 'AjaxError', status: number, response: {description?: string}} | {}) & Error

/* store - actions */
export type Action = ActionType<typeof actions>

/* store - reducers */
export type SocketStatus = 'closed' | 'opening' | 'opened'

export interface State {
    loggedIn: boolean,
    jwtToken: string | null,

    socketOpened: SocketStatus,
    socket: {
        message$: WebSocketSubject<ServerTimeMessage>,
        close$: Subject<CloseEvent>
    } | null,

    serverTime: number | null,
    
    loginForm: {
        username: string,
        password: string
    },

    message: string | null,
    isLoading: boolean
}

/* Insta stands for instantiated */

/* store - epics */
export type InstaEpic = Epic<Action, Action, State>

/* containers */
export type InstaDispatch = Dispatch<Action>

