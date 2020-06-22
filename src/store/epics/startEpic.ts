import { of, empty } from 'rxjs'
import { filter, mergeMap } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import actions from '../actions'
import { InstaEpic } from '../../types'

import { getSessionItem } from './common'

const startEpic: InstaEpic = action$ => action$.pipe(
    filter(isActionOf(actions.start)),
    mergeMap(() => {
        const jwtToken = getSessionItem('jwtToken')
        if (jwtToken) {
            return of(actions.loginSuccess(jwtToken))
        }
        return empty() //TODO: maybe set a flag in redux to display initial load banner?
    })
)

export default startEpic
