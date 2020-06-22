import * as startActions from './start'
import * as loginFormActions from './loginForm'
import * as loginActions from './login'
import * as subscribeActions from './subscribe'
import { logout } from './logout'

const actions = {
    ...startActions,
    logout,
    ...loginFormActions,
    ...loginActions,
    ...subscribeActions
}

export default actions