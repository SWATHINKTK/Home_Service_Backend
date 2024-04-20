import dotenv from "dotenv";
import express ,{ Express }from "express";
import cors from "cors";
import http from "http";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import userRouter from "../routers/userRouter";

dotenv.config();
const app:Express = express();

// CORS setup
const corsOptions = {
    origin: ["https://digital-campus.vercel.app","http://localhost:3000"],
    methods: ["GET", "PATCH", "PUT", "POST"],
    optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));


// URL Encoding
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use(cookieParser());
app.use(morgan("dev"));

const httpServer = http.createServer(app);


// Router
app.use('/api/user',userRouter)

export { httpServer }