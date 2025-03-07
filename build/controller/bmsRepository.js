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
                const booksData = yield book.findAll({ include: [{ model: author, as: "author" }, { model: gener, as: "category" }],
                    attributes: { exclude: ["id", "createdAt"] } });
                return booksData;
            }
            catch (err) {
                throw new Error("Something went Wrong !");
            }
        });
    }
    // async addBook(Book: BookBody): Promise<void> {
    //   console.log(Book);
    //   try {
    //     const {
    //       authorName,
    //       generType,
    //       bookTitle,
    //       bookIsbn,
    //       bookPublishDate,
    //       bookPrice,
    //     } = Book;
    //     // const bookCategory: any = await gener.create({ generName: generType });
    //     // const bookAuthor: any = await author.create({ authorName });
    //     // let newBook;
    //     // if (bookAuthor && bookCategory) {
    //     //   newBook = await book.create({
    //     //     bookTitle,
    //     //     bookISBN: bookIsbn,
    //     //     bookPublishDate,
    //     //     bookPrice,
    //     //     authorId: bookAuthor.id,
    //     //     generId: bookCategory.id,
    //     //   });
    //     // }
    //   } catch (err) {
    //     throw new Error("Something Went Wrong !");
    //   }
    // }
    addBook(Book) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Adding book:", Book);
            try {
                const { book_id, authorName, generType, bookTitle, bookIsbn, bookPublishDate, bookPrice } = Book;
                // console.log(authorName, generType, bookTitle, bookIsbn, bookPublishDate, bookPrice);
                // Create genre and author, handling potential errors
                const bookCategory = yield gener.create({ generName: generType }).catch(err => {
                    console.error("Error creating genre:", err);
                    throw new Error("Failed to create book genre.");
                });
                const bookAuthor = yield author.create({ authorName }).catch(err => {
                    console.error("Error creating author:", err);
                    throw new Error("Failed to create book author.");
                });
                if (!bookAuthor || !bookCategory) {
                    throw new Error("Author or genre creation failed.");
                }
                // console.log(typeof(bookCategory as {id:number}).id);
                // console.log(typeof(bookAuthor),typeof(bookCategory),typeof(bookIsbn));
                // Create book entry
                const str = bookIsbn + '';
                const newBook = yield book.create({
                    book_id,
                    bookTitle,
                    bookISBN: str,
                    bookPublishDate,
                    bookPrice,
                    authorId: bookAuthor.id,
                    generId: bookCategory.id,
                });
                console.log("Book created successfully:", newBook);
            }
            catch (err) {
                console.error("Error in addBook function:", err);
                throw new Error(err.message || "Something went wrong.");
            }
        });
    }
    deleteBookById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const isbn = id + '';
            try {
                yield book.destroy({ where: { bookISBN: isbn } });
            }
            catch (err) {
                throw new Error("Something went wrong while deleting book!");
            }
        });
    }
    updateBookWithId(id, bookData) {
        return __awaiter(this, void 0, void 0, function* () {
            const isbn = id + '';
            try {
                const books = yield book.findOne({ where: { bookISBN: isbn } });
                if (books) {
                    books.bookISBN = bookData.bookIsbn || books.bookISBN;
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
