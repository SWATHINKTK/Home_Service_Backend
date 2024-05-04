import { IUser } from "../../../domainLayer/user";

export interface IServerResponse<T = any> {
    statusCode: number;
    success: boolean;
    message?: string;
    token?:string;
    data?: T | T[];
}

export interface PublicUserInfo extends Omit<IUser, '_isBlocked' | 'password' >{

}
  