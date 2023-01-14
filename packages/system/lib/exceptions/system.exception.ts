import { BaseException } from '@chaperone/util';

/**
 * SystemException
 * 
 * A generic system exception
 */

export class SystemException extends BaseException {

    constructor(message: string = "System Error") {
        super(message);
    }
}