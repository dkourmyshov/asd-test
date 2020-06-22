import React from 'react'
import style from './LoginForm.module.scss'

type updateAction = (value: string) => void

interface LoginFormProps {
    username: string,
    password: string,
    message: string | null,
    dispatch: {
        updateUsername: updateAction,
        updatePassword: updateAction,
        submit: () => void
    }
}

const wrap = (updateAction: updateAction) => (event: React.ChangeEvent<HTMLInputElement>) => updateAction(event.target.value)

export const LoginForm: React.FunctionComponent<LoginFormProps> = props => {
    const valid = props.username.length > 0 && props.password.length > 0 
    return (
        <div className={style['login-form']}>
            <div className={style.field}>
                <label className={style.username} htmlFor="username"><span className={style.hidden}>Username</span></label>
                <input
                    name="username"
                    value={props.username}
                    type="text"
                    onChange={wrap(props.dispatch.updateUsername)}
                    onKeyUp={event => { if (valid && event.key === "Enter") { props.dispatch.submit() }} }
                    placeholder="Username"
                    required
                />
            </div>
            <div className={style.field}>
                <label className={style.password} htmlFor="password"><span className={style.hidden}>Password</span></label>
                <input
                    name="password"
                    value={props.password}
                    type="password"
                    onChange={wrap(props.dispatch.updatePassword)}
                    onKeyUp={event => { if (valid && event.key === "Enter") { props.dispatch.submit() }} }
                    placeholder="Password"
                    required
                />
            </div>
            {props.message !== null && (
                <div className={style.field}>{props.message}</div>
            )}
            <div className={style.field}>
                <button
                    onClick={() => { if (valid) { props.dispatch.submit() }} }
                    disabled={!valid}
                >Sign in</button>
            </div>
        </div>
    );
}
