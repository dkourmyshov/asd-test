import { getType } from 'typesafe-actions'
import produce from 'immer'
import actions from "../actions"
import { State, Action } from '../../types'

const initialState: State = {
    loggedIn: false,
    jwtToken: null,
    socketOpened: 'closed',
    socket: null,
    serverTime: null,
    loginForm: {
        username: '',
        password: ''
    },
    message: null,
    isLoading: false
}

export default (state = initialState, action: Action) => {
    return produce(state, draft => {
        switch (action.type) {
            case getType(actions.updateUsername):
                draft.loginForm.username = action.payload
                break
            case getType(actions.updatePassword):
                draft.loginForm.password = action.payload
                break
            case getType(actions.login):
                draft.isLoading = true
                draft.message = "Signing in…"
                break
            case getType(actions.loginSuccess):
                draft.isLoading = false
                draft.loggedIn = true
                draft.jwtToken = action.payload
                draft.loginForm = {username: '', password: ''}
                draft.message = null
                break
            case getType(actions.subscribe):
                draft.socketOpened = 'opening'
                break
            case getType(actions.socketOpened):
                draft.socketOpened = 'opened'
                draft.socket = action.payload
                draft.message = null
                break
            case getType(actions.socketClosed):
            case getType(actions.socketTimeout):
                draft.socketOpened = 'closed'
                draft.socket = null
                break
            case getType(actions.socketMessage):
                draft.serverTime = action.payload
                break
            case getType(actions.logout):
                draft.jwtToken = null
                draft.loggedIn = false
                draft.serverTime = null
                draft.message = null
                break
            case getType(actions.loginError):
            case getType(actions.socketError):
            case getType(actions.subscribeError):
                draft.isLoading = false
                if ('response' in action.payload) {
                    if ('description' in action.payload.response && typeof action.payload.response.description === 'string') {
                        draft.message = action.payload.response.description
                    } else {
                        if ('message' in action.payload && typeof action.payload.message === 'string') {
                            draft.message = action.payload.message
                        } else {
                            draft.message = "Unknown network error"
                        }
                    }
                } else {
                    if ('message' in action.payload && typeof action.payload.message === 'string') {
                        draft.message = action.payload.message
                    } else {
                        draft.message = "Unknown network error"
                    }
                }
                break
        }
    })
}
