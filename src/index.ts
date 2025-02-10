import express, { Request, Response } from 'express';
import { Dbconnect, sequelize } from './config/database.js';
import router from './routes/bmsRoutes.js';
const app = express();
const port = 3000;
app.use(express.json())
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, world!');
});

(async () => {
    await Dbconnect();
    await sequelize.sync({force:false});
})();

 app.get('/home', (req: Request, res: Response) => {
    res.send('Welcome to Home page!');
 });

 app.use("/api",router);

 app.use("*",async (req: Request, res: Response) => {res.send('this route is not defined')})
app.listen(port, () => {
  
    console.log(`Server is running on http://localhost:${port}`);
});