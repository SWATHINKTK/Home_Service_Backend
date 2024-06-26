import { InternalServerError } from "../../../../../usecases/handler/internalServerError";
import { WorkStatus } from "../../../../types/booking";
import { bookingModel } from "../../models/bookingModel";

export const findAverageOfServiceBooking = async(bookingModelInstance:typeof bookingModel) => {
    try {
        const averageOfServices = await bookingModelInstance.aggregate([
            {
                $group:{
                    _id:'$serviceId',
                    totalSum:{$sum:'$totalAmount'}
                }
            },
            {
                $group:{
                    _id:null,
                    totalBookings:{$sum:'$totalSum'},
                    services:{$push:{serviceId:'$_id', sum:'$totalSum'}}
                }
            },
            {
                $unwind:'$services'
            },
            {
                $lookup:{
                    from:'services',
                    localField:'services.serviceId',
                    foreignField:'_id',
                    as:'service'
                }
            },
            {
                $project:{
                    _id:0,
                    serviceId:'$services.serviceId',
                    count:'$services.totalSum',
                    serviceName:'$service.serviceName',
                    percentage:{
                        $multiply:[
                            {$divide:['$services.sum','$totalBookings']},100
                        ]
                    }
                }
            },
            {
                $unwind:'$serviceName'
            }
        ])
        console.log(averageOfServices)
        return averageOfServices;
    } catch (error) {
        console.log(error)
        throw new InternalServerError('Data Fetching Error');
    }
}