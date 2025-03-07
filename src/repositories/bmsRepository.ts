import { author, book, gener } from "../models/bmsModel.js";
import {
  BaseBook,
  BookBody,
  BookBodyOptional,
  BookReturnType,
} from "../types&interface/bmsTypes.js";
class BMSRepository implements BaseBook {
  async getBook(): Promise<BookReturnType[] | null> {
    try {
      const booksData = await book.findAll({ include: [{model:author,as:"author"},{model:gener,as:"category"}],
      attributes: { exclude: ["id", "createdAt"] } });
      return booksData as BookReturnType[];
    } catch (err) {
      throw new Error("Something went Wrong !");
    }
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
  async addBook(Book: BookBody): Promise<void> {
    console.log("Adding book:", Book);

    try {
        const {book_id,authorName, generType, bookTitle, bookIsbn, bookPublishDate, bookPrice } = Book;
      // console.log(authorName, generType, bookTitle, bookIsbn, bookPublishDate, bookPrice);
      
        // Create genre and author, handling potential errors
        const bookCategory:any = await gener.create({ generName: generType }).catch(err => {
            console.error("Error creating genre:", err);
            throw new Error("Failed to create book genre.");
        });

        const bookAuthor:any = await author.create({ authorName }).catch(err => {
            console.error("Error creating author:", err);
            throw new Error("Failed to create book author.");
        });

        if (!bookAuthor || !bookCategory) {
            throw new Error("Author or genre creation failed.");
        }
        // console.log(typeof(bookCategory as {id:number}).id);
        // console.log(typeof(bookAuthor),typeof(bookCategory),typeof(bookIsbn));
        
        // Create book entry
        const str = bookIsbn+'';
        const newBook = await book.create({
          book_id,
            bookTitle,
            bookISBN: str,
            bookPublishDate,
            bookPrice,
            authorId: (bookAuthor as {id:number}).id,
            generId: (bookCategory as {id:number}).id,
        });

        console.log("Book created successfully:", newBook);
    } catch (err: any) {
        console.error("Error in addBook function:", err);
        throw new Error(err.message || "Something went wrong.");
    }
}
  async deleteBookById(id: number): Promise<void> {
    const isbn = id+'';
    
    try {
      await book.destroy({ where: { bookISBN: isbn } });
    } catch (err) {
      throw new Error("Something went wrong while deleting book!");
    }
  }
  async updateBookWithId( 
    id: number,
    bookData: BookBodyOptional
  ): Promise<void> {
    const isbn = id+'';
    try {
      const books: any = await book.findOne({ where: { bookISBN: isbn } });

      if (books) {
        books.bookISBN = bookData.bookIsbn || books.bookISBN;
        books.bookPrice = bookData.bookPrice || books.bookPrice;
        books.bookTitle = bookData.bookTitle || books.bookTitle;
        books.bookPublishDate =
          bookData.bookPublishDate || books.bookPublishDate;
        await books.save();
      }
    } catch (err) {
      console.log(err);
      throw new Error("Something went wrong while updating book!");
    }
  }
  async deleteBook(): Promise<void> {}
}
export const newBookRepo = new BMSRepository();
