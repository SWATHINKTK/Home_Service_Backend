import jwt, { JwtPayload } from 'jsonwebtoken'
import { Next, Req, Res } from "../../types/expressTypes";
import { token } from 'morgan';
import { UserRepository } from '../../database/mongodb/repository/userRepository';
import { userModel } from '../../database/mongodb/models/userModel';
import { IUser } from '../../../domain/user';
import { BadRequestError } from '../../../usecases/handler/badRequestError';
import { UnauthorizedRequestError } from '../../../usecases/handler/unauthorizedRequestError';
import { ForbiddenError } from '../../../usecases/handler/forbiddenError';

const userRepositories = new UserRepository(userModel);


declare global {
    namespace Express {
        interface Request {
            user?: string;
        }
    }
}

interface IDecodedToken extends JwtPayload{
    _id:string;
    email:string;
    role:string;
}

export const userAuthentication = async(req:Req, res:Res, next:Next) => {

    try {
        console.log("----------------------AUTHENTICATION-------------------------------")
        const token = req.cookies.userATkn;
        console.log(req.cookies)
        console.log(token, process.env.JWT_KEY)
        if (!token) {
            throw new UnauthorizedRequestError();

        }

        const decodedToken = jwt.verify(token, process.env.JWT_KEY as string) as IDecodedToken;
        console.log(decodedToken)
        if(decodedToken.role != 'user' || !decodedToken){
            return res.status(401).json({
                success: false,
                message: "Authentication Failed. Please log in and try again."
            });
        }
        console.log(decodedToken)
        req.user = decodedToken?.email;
        const existingUser:IUser | null = await userRepositories.findUser(decodedToken?.email);
        if(!existingUser){
            throw new BadRequestError('User is does not exist')
        }

        if(existingUser._isBlocked){
            throw new ForbiddenError()
        }
        
        next();
    } catch (error) {
        next(error);
    }
}