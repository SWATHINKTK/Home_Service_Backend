import { IUser } from "../../../domainLayer/user";

export interface PublicUserInfo extends Omit<IUser, '_isBlocked' | 'password' >{

}