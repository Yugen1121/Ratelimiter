import { Database } from "sqlite3";
import { user, UserModelInt } from "./types";
import dbClient from "../sqlClient";
class UsersModel implements UserModelInt {
    constructor(
        private db: Database
    ){
    }
    async findUsingId(id: number): Promise<user | undefined >{
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM users WHERE id = ?`
            this.db.get(query, [id], (error, row: user)=>{
                if  (error) reject(error);
                else resolve(row);
            })
        })
    }
    async findUsingEmail(email: string): Promise<user | undefined> {
        return new Promise((resolve, reject)=>{
            const query = 'SELECT * FROM users WHERE email = ?';
            this.db.get(query, [email], (err, row: user)=>{
                if(err) reject(err);
                else resolve(row);
            })
        })
    }
    async addUser(email: string, password: string, username: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO users(email, password, userName) values (?, ?, ?)";
            this.db.run(query, [email, password, username], (err) => {
                if (err) reject(err);
                else resolve();
            })
        })
    }
}

const userModel = new UsersModel(dbClient);
export default userModel;