export type user = {
    email: string,
    password: string,
    userName: string,
    id: number
}

export interface UserModelInt {
    findUsingId(id: number): Promise<user | undefined>;
    findUsingEmail(email: string): Promise<user | undefined>;
    addUser(email: string, password: string, username: string): Promise<void>;
}