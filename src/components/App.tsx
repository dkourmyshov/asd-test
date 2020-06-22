import React from 'react'
import ServerTime from '../containers/ServerTime'
import LoginForm from '../containers/LoginForm'
import style from './App.module.scss'

interface AppProps {
    loggedIn: boolean,
    isLoading: boolean
}

export const App: React.FunctionComponent<AppProps> = props => (
    <>
        <div className={style.app}>
            <div className={style.logo}>Test Task</div>
            {props.loggedIn ? <ServerTime /> : <LoginForm />}
        </div>
        {props.isLoading && (<div className={style.overlay} />)}
    </>
)

