import { author, book, gener } from "../models/bmsModel.js";
import { Request, Response,ErrorRequestHandler } from "express";
import { BookController } from "../types&interface/bmsTypes.js";
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

export const addBook = async (req: Request, res: Response): Promise<void> => {
    try {
        const { book_id,authorName, generType, bookTitle, bookIsbn, bookPublishDate, bookPrice } = req.body;

        if (!authorName || !generType || !bookTitle || !bookIsbn || !bookPublishDate || !bookPrice) {
            res.status(400).json({
                status: "error",
                message: "All fields are required.",
            });
            return;
        }

        const bookBody = {book_id,authorName, generType, bookTitle, bookIsbn, bookPublishDate, bookPrice };
        console.log(bookBody);
        
        await newBookService.addBook(bookBody);

        res.status(201).json({
            status: "success",
            message: "New book added successfully.",
            data: bookBody,
        });
    } catch (error) {
        console.error("Error adding book:", error);
        res.status(500).json({
            status: "error",
            message: error instanceof Error ? error.message : "Something went wrong.",
        });
    }
};
export const getBook = async (req:Request, res:Response) => {
        const booksData = await newBookService.getBook();
        console.log(booksData);
        
        if (booksData) {
            res.status(200).json({
                status: 'success',
                data:booksData
             })
        } else {
            res.status(400).json({
                error:"something went wrong"
            })
        }
}
export const deleteBookById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const bookId = Number(id);
    console.log(bookId, id);
    await newBookService.deleteBookById(bookId);
    res.status(200).json({
        status: 'success',
        message:"Book deleted successfully."
    })
}
export const updateBookWithId = async (req: Request, res: Response) => {
    const { id } = req.params;
    const bookId = Number(id);
    const {  bookTitle, bookIsbn, bookPublishDate, bookPrice } = req.body;
    const bookBody = {  bookTitle, bookIsbn, bookPublishDate, bookPrice };
    await newBookService.updateBookWithId(bookId, bookBody);
    res.status(200).json({
        status: 'success',
        message: 'updated successfully'
    })
}

const getBooks = async (req:Request, res:Response) => {
    try {
    } catch (err) {
        res.status(400).json({
            error:err
        })
     }
}










