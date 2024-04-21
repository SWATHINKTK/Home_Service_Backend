import { BadRequestError } from "../../handler/badRequestError";
import { IAdminRepository } from "../../interface/repository/IAdminRepository";
import { IServerResponse } from "../../interface/services/IResponse";
import { ISecretHasher } from "../../interface/services/ISecretHasher";
import { IJWT } from "../../interface/services/Ijwt";

export const adminLogin = async(
    adminRepository:IAdminRepository,
    secretHashService:ISecretHasher,
    jwtService:IJWT,
    username:string,
    password:string
):Promise<IServerResponse> => {
    try {
        const existingAdmin = await adminRepository.findAdmin(username);
        if(!existingAdmin){
            throw new BadRequestError('Invalid admin data.Please Check email & password.')
        }

        const checkCredentials = await secretHashService.checkSecretMatch(password, existingAdmin.password);
        if(!checkCredentials){
            throw new BadRequestError('Invalid admin data.Please Check email & password.')
        }
  
        console.log(existingAdmin,username,password,checkCredentials)

        const token:string = await jwtService.createJWT(existingAdmin._id,username,"Admin")
        return {
            statusCode:200,
            success:true,
            message:'Admin logged Successfully',
            token:token
        }
        
    } catch (error) {
        throw error
    }
}