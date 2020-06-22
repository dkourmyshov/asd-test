import { createAction } from 'typesafe-actions'

export const start = createAction('START', action => () => action())
export const startSuccess = createAction('START_SUCCESS', action => () => action())

