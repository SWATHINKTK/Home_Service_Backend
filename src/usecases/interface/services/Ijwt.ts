export interface IJWT{
    createJWT( userId:string, email:string, role:string ):string;
}