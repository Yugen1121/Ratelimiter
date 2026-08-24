
export interface IAuthServices {
    signUp(email: string, password: string, username: string): Promise<void>,
    signIn(email: string, password: string): Promise<string>;
    validateToken(token: string): number;
}
