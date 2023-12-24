export interface User {
    id: number|null,
    email: string,
    role: string|null,
    firstname: string|null,
    libelle: string|null,
    lastname: string|null,
}
export interface Log {
    email: string,
    password:string,
}
export interface LogToken {
    log:User,
    token:string
}