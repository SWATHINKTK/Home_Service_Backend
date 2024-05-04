import { IServerResponse } from "../../interface/services/IResponse"

/**
 * *Logs out the user from the system.
 * 
 * @returns {IServerResponse} A server response indicating successful user logout.
 */
export const logout = ():IServerResponse => {
    return{
        statusCode:200,
        success:true,
        message:"User Logout Sucessfully."
    }
}
    