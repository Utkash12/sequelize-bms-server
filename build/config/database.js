var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
class Database {
    constructor() { }
    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
                host: process.env.DB_HOST,
                port: Number(process.env.DB_PORT),
                dialect: process.env.DB_DIALECT
            });
        }
        return Database.instance;
    }
    static connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Database.getInstance().authenticate();
                console.log("Database connection successful.");
            }
            catch (error) {
                console.error("Failed to connect to database:", error);
            }
        });
    }
}
export default Database;
