import Database from "../config/database.js";
import { STRING, INTEGER } from "sequelize";
// Get the singleton instance of Sequelize
const sequelize = Database.getInstance();
export const author = sequelize.define('author', {
    authorName: {
        type: STRING,
        allowNull: false
    }
}, {
    freezeTableName: true
});
export const gener = sequelize.define('gener', {
    generName: {
        type: STRING,
        allowNull: false
    }
}, { freezeTableName: true });
export const book = sequelize.define('book', {
    book_id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    bookTitle: { type: STRING, allowNull: false },
    bookISBN: { type: STRING, allowNull: false },
    authorId: {
        type: INTEGER,
        allowNull: false,
        references: { model: "author", key: "id" }
    },
    bookPrice: { type: INTEGER, allowNull: false },
    bookPublishDate: { type: STRING, allowNull: false },
    generId: {
        type: INTEGER,
        allowNull: false,
        references: { model: "gener", key: "id" }
    }
}, { freezeTableName: true });
