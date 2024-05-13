import { IServerResponse } from "../../../infrastructure/types/IResponse"

/**
 * *Logs out the user from the system.
 * 
 * @returns {IServerResponse} A server response indicating successful user logout.
 */
export const logoutWorker = ():IServerResponse => {
    return{
        statusCode:200,
        success:true,
        message:"Worker Logout Sucessfully."
    }
}
    