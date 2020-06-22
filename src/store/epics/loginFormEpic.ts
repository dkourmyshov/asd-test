import { filter, map } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import actions from '../actions'
import { InstaEpic } from '../../types'

const loginFormEpic: InstaEpic = (action$, state$) => action$.pipe(
    filter(isActionOf(actions.submitLoginForm)),
    map(() => {
        const { username, password } = state$.value.loginForm
        return actions.login(username, password)
    })
)

export default loginFormEpic