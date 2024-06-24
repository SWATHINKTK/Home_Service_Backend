import { InternalServerError } from "../../../../../usecases/handler/internalServerError";
import { bookingModel } from "../../models/bookingModel";

export const findAverageOfServiceBooking = async(bookingModelInstance:typeof bookingModel) => {
    try {
        const averageOfServices = await bookingModelInstance.aggregate([
            {
                $group:{
                    _id:'$serviceId',
                    count:{$sum:1}
                }
            },
            {
                $group:{
                    _id:null,
                    totalBookings:{$sum:'$count'},
                    services:{$push:{serviceId:'$_id', count:'$count'}}
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
                    count:'$services.count',
                    serviceName:'$service.serviceName',
                    percentage:{
                        $multiply:[
                            {$divide:['$services.count','$totalBookings']},100
                        ]
                    }
                }
            },
            {
                $unwind:'$serviceName'
            }
        ])
        return averageOfServices;
    } catch (error) {
        console.log(error)
        throw new InternalServerError('Data Fetching Error');
    }
}