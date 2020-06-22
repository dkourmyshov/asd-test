import { connect } from 'react-redux'
import { State, InstaDispatch } from '../types'
import { ServerTime } from '../components/ServerTime'
import actions from '../store/actions'

const mapStateToProps = (state: State) => ({
    serverTime: state.serverTime,
    socketOpened: state.socketOpened,
    message: state.message
})

const mapDispatchToProps = (dispatch: InstaDispatch) => ({ dispatch: {
    logout: () => dispatch(actions.logout())
}})

export default connect(mapStateToProps, mapDispatchToProps)(ServerTime)