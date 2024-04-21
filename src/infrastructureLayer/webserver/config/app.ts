import dotenv from "dotenv";
import express ,{ Express }from "express";
import cors from "cors";
import http from "http";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import userRouter from "../routers/userRouter";
import adminRouter from '../routers/adminRouter';
import { errorHandler } from "../middleware/errorHandlerMiddleware";

dotenv.config();
const app:Express = express();

// CORS setup
const corsOptions = {
    origin: ["http://localhost:3000"],
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
app.use('/api/admin',adminRouter)


// Error handler
app.use(errorHandler)

export { httpServer }