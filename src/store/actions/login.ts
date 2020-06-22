import { createAction } from 'typesafe-actions'
import { httpError } from '../../types'

export const login = createAction('LOGIN', action => (username: string, password: string) => action({username, password}))
export const loginSuccess = createAction('LOGIN_SUCCESS', action => (jwtToken: string) => action(jwtToken))
export const loginError = createAction('LOGIN_ERROR', action => (error: httpError) => action(error)) //TODO: change type to httpError?
