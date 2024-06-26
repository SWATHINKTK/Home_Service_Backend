import mongoose, { Document } from "mongoose";
import { IWorker } from "../../../../../domain/worker";
import { DBConnectionError } from "../../../../../usecases/handler/databaseConnectionError";
import { workerModel } from "../../models/workerModel";

export const retrieveWorkerAllDetails = async (
    workerId: string,
    workerModelInstance: typeof workerModel
): Promise<(IWorker & Document)[] | []> => {
    try {

        let pipeline = [
            {$match: { _id: mongoose.Types.ObjectId.createFromHexString(workerId) }},
            {
                $lookup: {
                    from: "workerextrainfos",
                    localField: "_id",
                    foreignField: "workerId",
                    as: "workerInfo",
                },
            },
            {
                $unwind: "$workerInfo",
            },
            {
                $lookup: {
                    from: "services",
                    localField: "service",
                    foreignField: "_id",
                    as: "serviceInfo",
                },
            },
            {
                $unwind: "$serviceInfo",
            },
            {
                $project: {
                    _id: 1,
                    username: 1,
                    email: 1,
                    phoneNumber: 1,
                    district: 1,
                    location: 1,
                    _isBlocked: 1,
                    _isVerified: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    profile:1,
                    qualification: "$workerInfo.qualification",
                    experience: "$workerInfo.experience",
                    certificate: "$workerInfo.certificate",
                    idProof: "$workerInfo.idProof",
                    service: "$serviceInfo.serviceName",
                },
            }];

        const workers = await workerModelInstance.aggregate(pipeline);
        console.log(workers);
        return workers;
    } catch (error) {
        throw new DBConnectionError();
    }
};
