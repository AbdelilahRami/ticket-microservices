import { CustomError } from "./custom-error";

export class DataBaseConnectionError extends CustomError {
    statusCode=500;
   reason= 'error connection to db';
    constructor(){
        super('Error connecting to db');
        Object.setPrototypeOf(this, DataBaseConnectionError.prototype);

    }
    serializeErrors(): { message: string; filed?: string | undefined; }[] {
        return [{message: this.reason}]
    }

}