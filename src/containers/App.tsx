import { connect } from 'react-redux'
import { State } from '../types'
import { App } from '../components/App'

const mapStateToProps = (state: State) => ({
    loggedIn: state.loggedIn,
    isLoading: state.isLoading
})

export default connect(mapStateToProps)(App)