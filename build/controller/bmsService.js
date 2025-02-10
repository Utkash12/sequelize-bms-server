var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { newBookRepo } from "./bmsRepository.js";
class BMSService {
    constructor(bms) {
        this.bms = bms;
    }
    deleteBookById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.bms.deleteBookById(id);
        });
    }
    addBook(Book) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.bms.addBook(Book);
        });
    }
    updateBookWithId(id, bookData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.bms.updateBookWithId(id, bookData);
        });
    }
    getBook() {
        return __awaiter(this, void 0, void 0, function* () {
            const bookData = yield this.bms.getBook();
            if (bookData)
                return bookData;
            else
                return null;
        });
    }
    deleteBook() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
export const newBookService = new BMSService(newBookRepo);
