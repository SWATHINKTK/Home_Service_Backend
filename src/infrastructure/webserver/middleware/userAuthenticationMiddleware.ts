import jwt, { JwtPayload } from 'jsonwebtoken'
import { Next, Req, Res } from "../../types/expressTypes";
import { token } from 'morgan';



declare global {
    namespace Express {
        interface Request {
            user?: string;
        }
    }
}

interface IDecodedToken extends JwtPayload{
    userId:string;
    email:string;
    role:string;
}

export const userAuthentication = (req:Req, res:Res, next:Next) => {
    try {
        const token = req.cookies.userJWT;
        console.log(jwt, process.env.JWT_KEY)
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication Failed. Please log in and try again."
            });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_KEY as string) as IDecodedToken;
        console.log(decodedToken)
        req.user = decodedToken?.email;
        next();
    } catch (error) {
        next(error);
    }
}