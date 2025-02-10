import { book,author,gener } from "../models/bmsModel";
gener.hasOne(book,{
    foreignKey:'generId',
    as:'books'
})

book.belongsTo(gener,{
    foreignKey:'generId',
    as:'category'
})

author.hasMany(book,{
    foreignKey:'authorId',
    as:'books'  
})

book.belongsTo(author,{
    foreignKey:'authorId',
    as:'author'
})