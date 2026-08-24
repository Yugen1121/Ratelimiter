import { error } from "node:console";
import sqlite3 from "sqlite3";

const dbClient = new sqlite3.Database("db.sqlite");

process.on('SIGINT', () => {
    dbClient.close(() => {
        console.log('Database connection closed safely.');
        process.exit(0);
    });
});
export default dbClient;