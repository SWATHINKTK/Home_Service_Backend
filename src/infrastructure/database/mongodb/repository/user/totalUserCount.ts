import { BadRequestError } from "../../../../../usecases/handler/badRequestError";
import { InternalServerError } from "../../../../../usecases/handler/internalServerError";
import { userModel } from "../../models/userModel";

export const totalUsersCount = async(userModelInstance:typeof userModel):Promise<number> => {
    try {
        return await userModelInstance.countDocuments();
    } catch (error) {
        throw new InternalServerError('Dashboard Data Fetching Server Error');
    }
}