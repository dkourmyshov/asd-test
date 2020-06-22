import { createAction, ActionType } from 'typesafe-actions'

export const updateUsername = createAction('UPDATE_USERNAME', action => (username: string) => action(username))
export const updatePassword = createAction('UPDATE_PASSWORD', action => (password: string) => action(password))
export const submitLoginForm = createAction('SUBMIT_LOGIN_FORM', action => () => action())

const actions = { updateUsername, updatePassword, submitLoginForm }
export type Action = ActionType<typeof actions>