import { IWorker } from "../../../../../domain/worker";
import { BadRequestError } from "../../../../../usecases/handler/badRequestError";
import { IWorkerExtraInfo } from "../../../../types/workerExtraInfo";
import { workerExtraInfoModel } from "../../models/workerExtraInfoModel";
import { workerModel } from "../../models/workerModel";

export const workerRegister = async (
    workerData: IWorker,
    workerExtraInfo: IWorkerExtraInfo,
    workerModelInstance: typeof workerModel,
    workerExtraInfoModelInstance: typeof workerExtraInfoModel
): Promise<boolean> => {
    try {
        const workerDataStore = await workerModelInstance.create(workerData);
        if (!workerDataStore) {
            throw new BadRequestError("Failed to create worker.");
        }
        workerExtraInfo.workerId = workerDataStore._id;
        const storeExtraInfo = workerExtraInfoModelInstance.create(workerExtraInfo);
        if (!storeExtraInfo) {
            throw new BadRequestError("Failed to store worker extra information.");
        }
        return true;
    } catch (error) {
        throw error;
    }
};
