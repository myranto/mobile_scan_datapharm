import {User} from "../../base/User";

export const maxSize = 5
export const TokenUser = 'appUser-token'
export const logUser = 'user'


export function getUser(){
    const v = localStorage.getItem(logUser)
    const user:User = v ? JSON.parse(v) : null
    return user
}