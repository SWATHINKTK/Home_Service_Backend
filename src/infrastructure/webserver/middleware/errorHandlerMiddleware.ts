import { CustomClass } from "../../../usecases/handler/customError";
import { Next, Req, Res } from "../../types/expressTypes";

export const errorHandler = ( err:Error, req:Req, res:Res, next:Next ) => {
    console.log(err);
    if(err instanceof CustomClass){
        return res.status(err.statusCode).json({
            success:false,
            errors:err.serializeError()
        });
    }
    res.status(401).json({
        success:false,
        message:"user Unauthorized."
    })
}