import { InternalServerError } from "../../../../../usecases/handler/internalServerError";
import { userModel } from "../../models/userModel";

export const findDateBasedUserLoginCount = async(userModelInstance:typeof userModel) => {
    try {
       const  usersCount = await userModelInstance.aggregate([
        {
            $match: {
              createdAt: {
                $gte: new Date(new Date().setDate(new Date().getDate() - 7))
              }
            }
        },
        {
            $group:{
                _id:{$dateToString:{format:"%Y-%m-%d", date:'$createdAt'}},
                // _id:'$createdAt',
                count:{$sum:1}
            }
        },
        {
            $sort:{_id:1}
        }
    ]) 
    return usersCount;
    } catch (error) {
        throw new InternalServerError('User Login Count Data Fetching Error.');
    }
}