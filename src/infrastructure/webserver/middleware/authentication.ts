import jwt from "jsonwebtoken";


import { IJWT } from "../../../usecases/interface/services/Ijwt";
import { Next, Req, Res } from "../../types/expressTypes";
import { JWTService } from "../../services/jwtService";
import { UserRepository } from "../../database/mongodb/repository/userRepository";
import { userModel } from "../../database/mongodb/models/userModel";
import { IUserRepository } from "../../../usecases/interface/repository/IUserRepository";
import { IUser } from "../../../domain/user";
import { UnauthorizedRequestError } from "../../../usecases/handler/unauthorizedRequestError";
import { ForbiddenError } from "../../../usecases/handler/forbiddenError";
import { NotFoundError } from "../../../usecases/handler/notFoundError";
import { IDecodedToken } from "../../types/jwtDecode";

declare global {
    namespace Express {
        interface Request {
            user?: string;
            userId?:string;
            worker?:string;
            workerId?:string;
        }
    }
}

export class Authentication{
    
    private readonly _jwtService:IJWT;
    private readonly _userRepository:IUserRepository;
    constructor(){
        this._jwtService = new JWTService();
        this._userRepository = new UserRepository(userModel);
        this.protectUser = this.protectUser.bind(this);
    }

    async protectUser( req:Req, res:Res, next:Next ){
        try {
            const token = req.cookies.userATkn;
            if(!token){
                throw new UnauthorizedRequestError('Unauthorized Request.');
            }
            const decodedToken = this._jwtService.verifyJWT(token);
            // console.log(decodedToken)
            if(decodedToken.role != 'user' || !decodedToken){
                throw new ForbiddenError();
            }
            const existingUser:IUser | null = await this._userRepository.findUser(decodedToken?.email);
            if(!existingUser){
                throw new NotFoundError('user is not found');
            }

            if(existingUser._isBlocked){
                throw new ForbiddenError();
            }

            req.user = decodedToken?.email;
            req.userId = decodedToken?._id;
            next();
        } catch (error) {
            next(error);
        }
    }

    async protectWorker( req:Req, res:Res, next:Next ){
        try {
            console.log('protectedWorker')
            const token = req.cookies.workerATkn;
            console.log('-----------------------------------------------')
            console.log(token)
            if(!token){
                throw new UnauthorizedRequestError('Unauthorized Request.');
            }
            const decodedToken = this._jwtService.verifyJWT(token);
            console.log(decodedToken)
            if(decodedToken.role != 'worker' || !decodedToken){
                throw new ForbiddenError();
            }
            
            req.worker = decodedToken?.phoneNumber;
            req.workerId = decodedToken?._id;
            console.log('-----------------------------------------------')
            next();
        } catch (error) {
            next(error);
        }
    }

    async protectAdmin( req:Req, res:Res, next:Next ){
        try {
            console.log('protectedAdmin')
            const token = req.cookies.adminATkn;
            console.log('-----------------------------------------------')
            console.log(token)
            if(!token){
                throw new UnauthorizedRequestError('Unauthorized Request.');
            }
            const decodedToken = jwt.verify(token, process.env.JWT_KEY as string) as IDecodedToken;

            if(decodedToken.role != 'admin' || !decodedToken){
                throw new ForbiddenError();
            }
            
        
            next();
        } catch (error) {
            next(error);
        }
    }
}