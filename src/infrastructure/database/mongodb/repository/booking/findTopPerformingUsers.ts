import { InternalServerError } from "../../../../../usecases/handler/internalServerError";
import { PaymentStatus, WorkStatus } from "../../../../types/booking";
import { bookingModel } from "../../models/bookingModel";

export const findTopPerformingUsers = async(bookingModelInstance:typeof bookingModel) => {
    try {
        const topPerformers = await bookingModelInstance.aggregate([
            {
                $match:{
                    workStatus:WorkStatus.COMPLETED, paymentStatus:PaymentStatus.COMPLETED
                }
            },
            {
                $group:{
                    _id:'$userId',
                    sum:{$sum:'$totalAmount'}
                }
            },
            {
                $sort:{sum:-1}
            },
            {
                $limit:4
            },
            {
                $lookup: {
                    from: 'users',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'users'
                }
            },
            {
                $unwind: '$users'
            },
            {
                $project:{
                    _id:1,
                    sum:1,
                    name:{ $concat: ['$users.firstname', ' ', '$users.lastname'] },
                    email:'$users.email',
                    phoneNumber:'$users.phoneNumber'
                }
            }
        ]);
        return topPerformers;
    } catch (error) {
        throw new InternalServerError('Dashboard Data Fetching Error.')
    }
}