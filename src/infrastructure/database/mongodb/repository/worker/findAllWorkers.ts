import { Document } from "mongoose";
import { IWorker } from "../../../../../domain/worker";
import { DBConnectionError } from "../../../../../usecases/handler/databaseConnectionError";
import { workerModel } from "../../models/workerModel";

export const retrieveAllWorkers = async(status:boolean, workerModelInstance:typeof workerModel):Promise<(IWorker & Document)[] | []> => {
    try {
        const workers = await workerModelInstance.aggregate([
            {
                $match:{_isVerified:status}
            },
            {
                $lookup: {
                    from: 'workerextrainfos',    
                    localField:'_id',    
                    foreignField: 'workerId', 
                    as: 'workerInfo'         
  }
            },
            {
                $unwind:"$workerInfo"
            },
            {
                $lookup: {
                    from: 'services',
                    localField: 'service',
                    foreignField: '_id',
                    as: 'serviceInfo'
                }
            },
            {
                $unwind: "$serviceInfo"
            },
            {
                $project: {
                    _id: 1,
                    username: 1,
                    email: 1,
                    phoneNumber: 1,
                    district: 1,
                    location: 1,
                    password: 1,
                    _isBlocked: 1,
                    _isVerified: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    qualification: "$workerInfo.qualification",
                    experience: "$workerInfo.experience",
                    certificate: "$workerInfo.certificate",
                    idProof: "$workerInfo.idProof",
                    service:"$serviceInfo.serviceName"
                }
            }
        ]);
        return workers;
    } catch (error) {
        throw new DBConnectionError();
    }
}