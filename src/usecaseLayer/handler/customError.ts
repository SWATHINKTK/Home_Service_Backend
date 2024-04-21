export abstract class CustomClass extends Error{
    abstract statusCode :number;

    constructor(message:string){
        super(message);
    }

    abstract serializeError():{ message:string, fields?:string }[]
}