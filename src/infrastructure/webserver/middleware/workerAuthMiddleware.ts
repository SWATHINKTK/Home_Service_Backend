import jwt, { JwtPayload } from 'jsonwebtoken'
import { Next, Req, Res } from "../../types/expressTypes";
import { token } from 'morgan';



declare global {
    namespace Express {
        interface Request {
            worker?: string;
        }
    }
}

interface IDecodedToken extends JwtPayload{
    userId:string;
    email:string;
    role:string;
}

export const workerRouteProtect = (req:Req, res:Res, next:Next) => {
    try {
        const token = req.cookies.workerJWT;
        console.log(jwt, process.env.JWT_KEY)
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication Failed. Please log in and try again."
            });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_KEY as string) as IDecodedToken;
        if(decodedToken.role != 'worker'){
            return res.status(401).json({
                success: false,
                message: "Authentication Failed. Please log in and try again."
            });
        }
        req.worker = decodedToken?.email;
        next();
    } catch (error) {
        next(error);
    }
}