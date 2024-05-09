
import { BadRequestError } from "../../handler/badRequestError";
import { IServerResponse } from "../../interface/services/IResponse";
import { IWorkerRepository } from "../../interface/repository/IWorkerRepository";

export const editWorkerProfile = async(
    workerPhoneNumber:string,
    username:string,
    email:string,
    district:string,
    location:string,
    workerImage: { [fieldname: string]: Express.Multer.File[] },
    workerRepository:IWorkerRepository
):Promise<IServerResponse> => {
    try {
        if(!workerPhoneNumber || !username || !email || !district || !location){
            throw new BadRequestError('Request Failed.Ensure Our data.')
        }

        const query = {phoneNumber:workerPhoneNumber}
        const existingWorker = await workerRepository.findWorker(query);
        if(!existingWorker){
            throw new BadRequestError('Worker Does Not Exist.')
        }

        const profile = workerImage && workerImage["profile"] && workerImage["profile"][0] && (workerImage["profile"][0] as any).location ;
       
    
        const updatedData = {
            username,
            email,
            district,
            location,
            profile,
        }
        const updateUserData = await workerRepository.updateWorkerData(workerPhoneNumber, updatedData);
        return {
            statusCode:200,
            success:true,
            message:'Worker Data Updated Successfully.'
        }
    } catch (error) {
        throw error;
    }
    

}