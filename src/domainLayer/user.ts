export interface IUser{
    id?:string;
    firstname:string;
    lastname:string;
    email:string;
    phoneNumber:string;
    district:string;
    password:string;
    _isBlocked?:boolean;
}