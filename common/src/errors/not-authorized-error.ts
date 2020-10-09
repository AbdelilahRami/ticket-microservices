import {Request, Response, NextFunction } from 'express';
import { CustomError } from './custom-error';

export class NotAuthorizedError extends CustomError{
    statusCode=401;

    constructor(){
        super('Not authorized');
        Object.setPrototypeOf(this, NotAuthorizedError.prototype);
    }

    serializeErrors(): { message: string; filed?: string | undefined; }[] {
        return [{message: 'Not authorized'}]
    }
    
}
