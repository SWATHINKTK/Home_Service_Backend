import jwt from 'jsonwebtoken'
import { Next, Req, Res } from "../../types/expressTypes";



declare global {
    namespace Express {
        interface Request {
            user?: string;
        }
    }
}

export const userAuthentication = (req:Req, res:Res, next:Next) => {
    try {
        const jwt = req.cookies.userJWT;
        if(!jwt){
            res.status(401).json({
                success:false,
                message:"Authentication Failed.Logged and use."
            })
        }

        const jwtDecode = jwt.verify(jwt, process.env.JWT_KEY) ;
        req.user = jwtDecode._id;
    } catch (error) {
        next(error);
    }
}