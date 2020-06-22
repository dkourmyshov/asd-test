import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import rootReducer from './reducers'
import rootEpic from './epics'
import actions from './actions'

const epicMiddleware = createEpicMiddleware()

export default function configureStore() {
    const store = createStore(
        rootReducer,
        applyMiddleware(epicMiddleware)
    )

    epicMiddleware.run(rootEpic)
    store.dispatch(actions.start())

    return store
}