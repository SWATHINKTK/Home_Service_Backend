import { IDecodedToken } from "../../../infrastructure/types/jwtDecode";

export interface IJWT{
    createJWT(credential:Record<string, string>):{accessToken:string, refreshToken:string};
    verifyJWT(token:string):IDecodedToken;
}