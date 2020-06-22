import { combineEpics } from 'redux-observable'

import startEpics from './startEpic'
import loginFormEpics from './loginFormEpic'
import loginEpics from './loginEpic'
import subscribeEpics from './subscribeEpic'
import logoutEpics from './logoutEpic'

export default combineEpics(loginEpics, startEpics, loginFormEpics, subscribeEpics, logoutEpics)
