var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { author, book, gener } from "../models/bmsModel.js";
class BMSRepository {
    getBook() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const booksData = yield book.findAll({
                    attributes: { exclude: ["id", "createdAt"] },
                });
                return booksData;
            }
            catch (err) {
                throw new Error("Something went Wrong !");
            }
        });
    }
    addBook(Book) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { authorName, generType, bookTitle, bookIsbn, bookPublishDate, bookPrice, } = Book;
                const bookCategory = yield gener.create({ generName: generType });
                const bookAuthor = yield author.create({ authorName });
                let newBook;
                if (bookAuthor && bookCategory) {
                    newBook = yield book.create({
                        bookTitle,
                        bookISBN: bookIsbn,
                        bookPublishDate,
                        bookPrice,
                        authorId: bookAuthor.id,
                        generId: bookCategory.id,
                    });
                }
            }
            catch (err) {
                throw new Error("Something Went Wrong !");
            }
        });
    }
    deleteBookById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield book.destroy({ where: { bookIsbn: id } });
            }
            catch (err) {
                throw new Error("Something went wrong while deleting book!");
            }
        });
    }
    updateBookWithId(id, bookData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const books = yield book.findOne({ where: { bookISBN: id } });
                if (books) {
                    books.authorName = bookData.authorName || books.authorName;
                    books.bookIsbn = bookData.bookIsbn || books.bookIsbn;
                    books.bookPrice = bookData.bookPrice || books.bookPrice;
                    books.bookTitle = bookData.bookTitle || books.bookTitle;
                    books.bookPublishDate =
                        bookData.bookPublishDate || books.bookPublishDate;
                    yield books.save();
                }
            }
            catch (err) {
                console.log(err);
                throw new Error("Something went wrong while updating book!");
            }
        });
    }
    deleteBook() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
export const newBookRepo = new BMSRepository();
