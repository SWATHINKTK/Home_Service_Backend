import { IServerResponse } from "../../interface/services/IResponse"

export const adminLogout = ():IServerResponse => {
    return{
        statusCode:200,
        success:true,
        message:"User Logout Sucessfully."
    }
}
    