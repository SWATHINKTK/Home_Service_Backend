export interface IValidationResult {
    success: boolean;
    message: string;
}

export interface IRequestValidator{
    validateRequiredFields(data:Record<string, any>, requiredField:string[]):IValidationResult;
}