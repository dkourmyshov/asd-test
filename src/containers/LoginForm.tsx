import { connect } from 'react-redux'
import { State, InstaDispatch } from '../types'
import { LoginForm } from '../components/LoginForm'
import { updateUsername, updatePassword, submitLoginForm } from '../store/actions/loginForm'

const mapStateToProps = (state: State) => ({
    username: state.loginForm.username,
    password: state.loginForm.password,
    message: state.message
})

const mapDispatchToProps = (dispatch: InstaDispatch) => ({ dispatch: {
    updateUsername: (username: string) => dispatch(updateUsername(username)),
    updatePassword: (password: string) => dispatch(updatePassword(password)),
    submit: () => dispatch(submitLoginForm())
}})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
