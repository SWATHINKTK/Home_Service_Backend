import { IServerResponse } from "../../interface/services/IResponse"

export const logout = ():IServerResponse => {
    return{
        statusCode:200,
        success:true,
        message:"User Logout Sucessfully."
    }
}
    