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
      const booksData = await book.findAll({
        attributes: { exclude: ["id", "createdAt"] },
      });
      return booksData as BookReturnType[];
    } catch (err) {
      throw new Error("Something went Wrong !");
    }
  }

  async addBook(Book: BookBody): Promise<void> {
    try {
      const {
        authorName,
        generType,
        bookTitle,
        bookIsbn,
        bookPublishDate,
        bookPrice,
      } = Book;
      const bookCategory: any = await gener.create({ generName: generType });
      const bookAuthor: any = await author.create({ authorName });
      let newBook;
      if (bookAuthor && bookCategory) {
        newBook = await book.create({
          bookTitle,
          bookISBN: bookIsbn,
          bookPublishDate,
          bookPrice,
          authorId: bookAuthor.id,
          generId: bookCategory.id,
        });
      }
    } catch (err) {
      throw new Error("Something Went Wrong !");
    }
  }

  async deleteBookById(id: number): Promise<void> {
    try {
      await book.destroy({ where: { bookIsbn: id } });
    } catch (err) {
      throw new Error("Something went wrong while deleting book!");
    }
  }
  async updateBookWithId(
    id: number,
    bookData: BookBodyOptional
  ): Promise<void> {
    try {
      const books: any = await book.findOne({ where: { bookISBN: id } });

      if (books) {
        books.authorName = bookData.authorName || books.authorName;
        books.bookIsbn = bookData.bookIsbn || books.bookIsbn;
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
