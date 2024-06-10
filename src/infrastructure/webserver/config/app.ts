import dotenv from "dotenv";
import express ,{ Express }from "express";
import cors from "cors";
import http from "http";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import userRouter from "../routers/userRouter";
import adminRouter from '../routers/adminRouter';
import workRouter from '../routers/workerRouter';
import chatRouter from '../routers/chatRouter';
import { errorHandler } from "../middleware/errorHandlerMiddleware";
import { SocketManager } from "../../services/stocketIO";

dotenv.config();
const app:Express = express();

// CORS setup
const corsOptions = {
    origin: ["http://localhost:5173","http://10.4.2.182:5173"],
    methods: ["GET", "PATCH", "PUT", "POST"],
    optionsSuccessStatus: 204,
    credentials: true 
};
app.use(cors(corsOptions));


// URL Encoding
app.use(
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ): void => {
      if (req.originalUrl === '/api/user/webhook') {
        next();
      } else {
        express.json()(req, res, next);
      }
    }
  );
app.use(express.urlencoded({extended:true}));


app.use(cookieParser());
app.use(morgan("dev"));

const httpServer = http.createServer(app);
const socket = new SocketManager(httpServer);


// Router
app.use('/api/user',userRouter);
app.use('/api/admin', adminRouter);
app.use('/api/worker', workRouter);
app.use('/api/chat', chatRouter);


// Error handler
app.use(errorHandler)

export { httpServer }