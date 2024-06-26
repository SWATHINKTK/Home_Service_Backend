import { InternalServerError } from "../../../../../usecases/handler/internalServerError";
import { userModel } from "../../models/userModel";

export const findDateBasedUserLoginCount = async(userModelInstance:typeof userModel) => {
    try {
        const usersCount = await userModelInstance.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(new Date().setMonth(new Date().getMonth() - 5))
                    }
                }
            },
            {
                $group: {
                    _id: { 
                        year: { $year: "$createdAt" }, 
                        month: { $month: "$createdAt" } 
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { "_id.year": 1, "_id.month": 1 }
            }
        ]);
    return usersCount;
    } catch (error) {
        throw new InternalServerError('User Login Count Data Fetching Error.');
    }
}