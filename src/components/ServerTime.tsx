import React from 'react'
import moment from 'moment'
import { SocketStatus } from '../types'
import style from './ServerTime.module.scss'


interface ServerTimeProps {
    serverTime: number | null,
    socketOpened: SocketStatus,
    message: string | null,
    dispatch: {
        logout: () => void
    }
}

export const ServerTime: React.FunctionComponent<ServerTimeProps> = (props) => (
    <div className={style['server-time']}>
        <div className={style.field}>{{
            closed: 'Not connected to server, please wait or sign out and sign in again',
            opening: 'Connecting…',
            opened: 'Connected to server'}[props.socketOpened]}</div>
        {props.serverTime && (
            <div className={style.field}>{moment(new Date(props.serverTime * 1000)).format('DD.MM.YY HH:mm:ss')}</div>
        )}
        {props.message !== null && (
            <div className={style.field}>{props.message}</div>
        )}
        <div className={style.field}><button onClick={() => props.dispatch.logout()}>Sign out</button></div>
    </div>
)
