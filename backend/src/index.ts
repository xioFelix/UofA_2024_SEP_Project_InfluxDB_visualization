import express, {Request, Response} from 'express';
import cors from 'cors';
import "dotenv/config";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// test route to check if the server is running
app.get("/api/test", async(req: Request, res: Response) => {
    res.json({ message: "Hello world!" });
});

// start the server at port 7000
app.listen(7000, ()=>{
    console.log("Server is running on port 7000");
});