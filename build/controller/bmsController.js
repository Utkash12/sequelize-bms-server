var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { newBookService } from "./bmsService.js";
export const addBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorName, generType, bookTitle, bookIsbn, bookPublishDate, bookPrice } = req.body;
    console.log(req.body);
    const bookBody = { authorName, generType, bookTitle, bookIsbn, bookPublishDate, bookPrice };
    console.log(bookBody);
    yield newBookService.addBook(bookBody);
    res.status(200).json({
        status: "success",
        message: "newBook added Successfully.",
        data: bookBody
    });
});
export const getBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const booksData = yield newBookService.getBook();
    if (booksData) {
        res.status(200).json({
            status: 'success',
            data: booksData
        });
    }
    else {
        res.status(400).json({
            error: "something went wrong"
        });
    }
});
export const deleteBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const bookId = Number(id);
    console.log(bookId, id);
    yield newBookService.deleteBookById(bookId);
    res.status(200).json({
        status: 'success',
        message: "Book deleted successfully."
    });
});
export const updateBookWithId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const bookId = Number(id);
    const { authorName, generType, bookTitle, bookIsbn, bookPublishDate, bookPrice } = req.body;
    const bookBody = { authorName, generType, bookTitle, bookIsbn, bookPublishDate, bookPrice };
    yield newBookService.updateBookWithId(bookId, bookBody);
    res.status(200).json({
        status: 'success',
        message: 'updated successfully'
    });
});
const getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (err) {
        res.status(400).json({
            error: err
        });
    }
});
