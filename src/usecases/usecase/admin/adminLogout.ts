import { IServerResponse } from "../../../infrastructure/types/IResponse"

export const adminLogout = ():IServerResponse => {
    return{
        statusCode:200,
        success:true,
        message:"User Logout Sucessfully."
    }
}
    