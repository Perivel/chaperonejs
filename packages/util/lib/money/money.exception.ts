import { BaseException } from './../common';

/**
 * MoneyException
 * 
 * Money error.
 */
export class MoneyException extends BaseException {
    constructor(message: string = "Money Error") {
        super(message);
    }
}