import { book, author, gener } from "../models/bmsModel.js";

// A genre has one book
gener.hasOne(book, {
    foreignKey: 'generId',
    as: 'books'
});

// A book belongs to a genre
book.belongsTo(gener, {
    foreignKey: 'generId',
    as: 'category'
});

// An author can have multiple books
author.hasMany(book, {
    foreignKey: 'authorId',
    as: 'books'  
});

// A book belongs to an author
book.belongsTo(author, {
    foreignKey: 'authorId',
    as: 'author'
});
