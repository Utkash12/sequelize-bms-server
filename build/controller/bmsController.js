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
// export const addBook = async (req: Request, res: Response):Promise<Response | void> => {
//     try {
//         const { authorName, generType, bookTitle, bookIsbn, bookPublishDate, bookPrice } = req.body;
//         // Validate required fields
//         if (!authorName || !generType || !bookTitle || !bookIsbn || !bookPublishDate || !bookPrice) {
//             return res.status(400).json({
//                 status: "error",
//                 message: "All fields are required.",
//             });
//         }
//         const bookBody = { authorName, generType, bookTitle, bookIsbn, bookPublishDate, bookPrice };
//         // console.log("Received book data:", bookBody);
//         await newBookService.addBook(bookBody);
//         res.status(200).json({
//             status: "success",
//             message: "New book added successfully.",
//             data: bookBody
//         });
//     } catch (error) {
//         console.error("Error adding book:", error);
//         res.status(500).json({
//             status: "error",
//             // message: error.message || "Something went wrong.",
//         });
//     }
// };
export const addBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book_id, authorName, generType, bookTitle, bookIsbn, bookPublishDate, bookPrice } = req.body;
        if (!authorName || !generType || !bookTitle || !bookIsbn || !bookPublishDate || !bookPrice) {
            res.status(400).json({
                status: "error",
                message: "All fields are required.",
            });
            return;
        }
        const bookBody = { book_id, authorName, generType, bookTitle, bookIsbn, bookPublishDate, bookPrice };
        console.log(bookBody);
        yield newBookService.addBook(bookBody);
        res.status(201).json({
            status: "success",
            message: "New book added successfully.",
            data: bookBody,
        });
    }
    catch (error) {
        console.error("Error adding book:", error);
        res.status(500).json({
            status: "error",
            message: error instanceof Error ? error.message : "Something went wrong.",
        });
    }
});
export const getBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const booksData = yield newBookService.getBook();
    console.log(booksData);
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
    const { bookTitle, bookIsbn, bookPublishDate, bookPrice } = req.body;
    const bookBody = { bookTitle, bookIsbn, bookPublishDate, bookPrice };
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
