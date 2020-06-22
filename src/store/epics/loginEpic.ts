import { of } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { mergeMap, map, mapTo, filter, retryWhen, catchError, tap } from 'rxjs/operators'
import { combineEpics, Epic } from 'redux-observable'
import { ActionType, isActionOf } from 'typesafe-actions'
import { API, thirdTimesACharm, setSessionItem } from './common'

import { State, InstaEpic } from '../../types'
import actions from '../actions'
import * as loginActions from '../actions/login'
type LoginAction = ActionType<typeof loginActions>

const ENDPOINT = '/login'

const loginEpic: Epic<LoginAction, LoginAction, State> = action$ => action$.pipe(
    filter(isActionOf(actions.login)),
    mergeMap((action: ActionType<typeof actions.login>) =>
        ajax({ url: `${API}${ENDPOINT}`, method: 'POST', body: action.payload, headers: {'Content-Type': 'application/json'} }).pipe(
            map(ajaxResponse => {
                const jwtToken = ajaxResponse.xhr.getResponseHeader('x-test-app-jwt-token')
                if (jwtToken !== null) {
                    return actions.loginSuccess(jwtToken)
                } else {
                    throw(new Error('Error signing in'))
                }
            }),
            retryWhen(thirdTimesACharm),
            catchError(error => of(actions.loginError(error)))
        )
    )
)

const loginSuccessEpic: InstaEpic = action$ => action$.pipe(
    filter(isActionOf(actions.loginSuccess)),
    tap(action => setSessionItem('jwtToken', action.payload)),
    mapTo(actions.subscribe())
)

export default combineEpics(loginEpic, loginSuccessEpic)
