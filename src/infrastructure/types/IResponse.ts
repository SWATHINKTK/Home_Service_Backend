import { IUser } from "../../domain/user";


export interface IServerResponse<T = any> {
    statusCode: number;
    success: boolean;
    message?: string;
    token?:{accessToken:string, refreshToken:string};
    data?: T | T[];
    page?:number;
    currentPage?:number;
}

export interface PublicUserInfo extends Omit<IUser, '_isBlocked' | 'password' >{

}
  