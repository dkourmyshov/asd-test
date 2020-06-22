import { Observable, of, throwError } from 'rxjs' 
import { mergeMap } from 'rxjs/operators'
import { httpError } from '../../types'

// repeat request up to three times (two times after the initial) if error is returned;
// unless the error is 400 or 401
export const thirdTimesACharm = (error$: Observable<httpError>) => error$.pipe(
    mergeMap((error, index) => (
        (('status' in error && (error.status === 400 || error.status === 401)) || index >= 2) // give up on third attempt
            ? throwError(error)
            : of(error)
    ))
)

export const API = 'https://work.vint-x.net/api'

const appId = 'ads-test-task'

export const setSessionItem = (name: string, value: any) => {
    const area = JSON.parse(window.sessionStorage.getItem(appId) || '{}')
    area[name] = value
    window.sessionStorage.setItem(appId, JSON.stringify(area)) 
}

export const deleteSessionItem = (name: string) => {
    const area = JSON.parse(window.sessionStorage.getItem(appId) || '{}')
    delete area[name]
    window.sessionStorage.setItem(appId, JSON.stringify(area)) 
}

export const getSessionItem = (name: string) => JSON.parse(window.sessionStorage.getItem(appId) || '{}')[name]
