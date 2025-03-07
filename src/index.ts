import express, { Request, Response } from 'express';
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

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, world!');
});

// Initialize database connection using Singleton
(async () => {
    await Database.connect();
    const sequelize = Database.getInstance(); 
    await sequelize.sync({ force: false }); 
})();

app.get('/home', (req: Request, res: Response) => {
    res.send('Welcome to Home page!');
});

app.use("/api/v1", router);

app.use("*", async (req: Request, res: Response) => {
    res.send('This route is not defined');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
