import { bookingModel } from "../../../infrastructure/database/mongodb/models/bookingModel";
import { IServerResponse } from "../../../infrastructure/types/IResponse";
import { NotFoundError } from "../../handler/notFoundError";
import { IBookingRepository } from "../../interface/repository/IBookingRepository";
import { IWorkerRepository } from "../../interface/repository/IWorkerRepository";

export const getNearbyBookings = async (
    workerId: string,
    workStatus: { [key: string]: any },
    paymentStatus: { [key: string]: any },
    latitude: number,
    longitude: number,
    page: number,
    pageSize: number,
    workerRepository: IWorkerRepository,
    bookingRepository: IBookingRepository
): Promise<IServerResponse> => {
    try {
        const worker = await workerRepository.findWorker({ _id: workerId });
        if (!worker) {
            throw new NotFoundError('Worker is Not Found.')
        }

        const radiusInKm = 40;
        const radiusInRadians = radiusInKm / 6371; // Earth's radius in kilometers

        const query = {
            workStatus: workStatus,
            paymentStatus: paymentStatus,
            serviceId: worker.service,
            "address.location": {
                $geoWithin: {
                    $centerSphere: [
                        [longitude, latitude], // [longitude, latitude] order is important
                        radiusInRadians
                    ]
                }
            }
        }


        const bookingGenerator = bookingRepository.findAllBooking(page, pageSize, query, false);
        const bookings = await bookingGenerator.next();
        return {
            statusCode: 200,
            success: true,
            message: 'Booking Data Retrieved Successful.',
            data: bookings.value
        }
    } catch (error) {
        throw error
    }
};
