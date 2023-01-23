import { BaseException } from './../exceptions';

/**
 * RangeException
 * 
 * A Range Error
 */
export class RangeException extends BaseException {

    constructor(message: string = "Range Error") {
        super(message);
    }
}