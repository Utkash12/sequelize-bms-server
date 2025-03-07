import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

class Database {
    private static instance: Sequelize;

    private constructor() {}

    public static getInstance(): Sequelize {
        if (!Database.instance) {
            Database.instance = new Sequelize(
                process.env.DB_NAME!,
                process.env.DB_USER!,
                process.env.DB_PASSWORD!,
                {
                    host: process.env.DB_HOST,
                    port: Number(process.env.DB_PORT),
                    dialect: process.env.DB_DIALECT as "postgres"
                }
            );
        }
        return Database.instance;
    }

    public static async connect() {
        try {
            await Database.getInstance().authenticate();
            console.log("Database connection successful.");
        } catch (error) {
            console.error("Failed to connect to database:", error);
        }
    }
}

export default Database;
