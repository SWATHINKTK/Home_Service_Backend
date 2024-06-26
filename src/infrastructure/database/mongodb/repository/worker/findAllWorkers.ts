import { Document, Query } from "mongoose";
import { IWorker } from "../../../../../domain/worker";
import { workerModel } from "../../models/workerModel";
import { InternalServerError } from "../../../../../usecases/handler/internalServerError";
import { IWorkerResponse } from "../../../../types/worker";

export const findAllWorkers = async ( pageNumber:number, pageSize:number, query:Record<string,any>, workerModelInstance: typeof workerModel): Promise<IWorkerResponse> => {
    try {
        const skip = (pageNumber - 1) * pageSize;
        const totalDocuments = await workerModelInstance.countDocuments(query);
        const totalPages = Math.ceil(totalDocuments / pageSize)
        const AllWorkers = await workerModelInstance.find(query)
                                        .populate({path:'service', select:'serviceName'})
                                        .skip(skip)
                                        .limit(pageSize)
                                        .sort({createdAt:-1});
        return {
            currentPage:pageNumber,
            totalDocuments,
            totalPages,
            workers:AllWorkers
        }
    } catch (error) {
        throw new InternalServerError("Workers Data Fetching Server Error.");
    }

};
