import { JwtPayload } from "jsonwebtoken";

export interface IDecodedToken extends JwtPayload{
    _id:string;
    email:string;
    role:string;
}