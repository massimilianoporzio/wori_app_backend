import express, { Request, Response } from 'express';
import { json } from 'body-parser';
import authRoutes from './routes/authRoute';

const app = express();
app.use(json());

app.use('/auth', authRoutes);
// app.get('/',
//     (req: Request,res: Response)=>{
//         console.log("test")
//         res.send("Yes it works");
// });

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})