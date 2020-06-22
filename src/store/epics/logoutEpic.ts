import { filter, mapTo, tap } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import actions from '../actions'
import { InstaEpic } from '../../types'

import { deleteSessionItem } from './common'

const logoutEpic: InstaEpic = action$ => action$.pipe(
    filter(isActionOf(actions.logout)),
    tap(() => deleteSessionItem('jwtToken')),
    mapTo(actions.socketDisconnect())
)

export default logoutEpic
