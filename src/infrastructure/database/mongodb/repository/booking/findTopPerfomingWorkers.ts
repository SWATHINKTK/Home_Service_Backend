import { InternalServerError } from "../../../../../usecases/handler/internalServerError"
import { PaymentStatus, WorkStatus } from "../../../../types/booking"
import { bookingModel } from "../../models/bookingModel"

export const findTopPerformingWorkers = async(bookingModelInstance:typeof bookingModel) => {
    try {
        const topPerformers = await bookingModelInstance.aggregate([
            {
                $match:{
                    workStatus:WorkStatus.COMPLETED, paymentStatus:PaymentStatus.COMPLETED
                }
            },
            {
                $group:{
                    _id:'$workerId',
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
                    from: 'workers',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'workers'
                }
            },
            {
                $unwind: '$workers'
            },
            {
                $project:{
                    _id:1,
                    sum:1,
                    name:'$workers.username',
                    email:'$workers.email',
                    phoneNumber:'$workers.phoneNumber'
                }
            }
        ]);
        return topPerformers;
    } catch (error) {
        throw new InternalServerError('Dashboard data fetching error.')
    }
}