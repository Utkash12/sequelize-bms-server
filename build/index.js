var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import Database from './config/database.js';
import router from './routes/bmsRoutes.js';
import "./associations/bookassociation.js";
import cors from 'cors';
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:4200'
}));
app.get('/', (req, res) => {
    res.send('Hello, world!');
});
// Initialize database connection using Singleton
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield Database.connect();
    const sequelize = Database.getInstance();
    yield sequelize.sync({ force: false });
}))();
app.get('/home', (req, res) => {
    res.send('Welcome to Home page!');
});
app.use("/api/v1", router);
app.use("*", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('This route is not defined');
}));
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
