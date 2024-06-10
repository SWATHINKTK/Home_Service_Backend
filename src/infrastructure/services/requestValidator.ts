import { IRequestValidator, IValidationResult } from "../../usecases/interface/services/IRequestValidator";

export class RequestValidator implements IRequestValidator{

    validateRequiredFields(data: Record<string, any>, requiredField: string[]): IValidationResult {
        for(const field of requiredField){
            if(data[field] == undefined){
                return{
                    success:false,
                    message:`Missing required parameter: ${field}`
                }
            }
        }
        return {
            success:true,
            message:'Valid Fields'
        }
    }
    
}