import { SystemException } from './../../exceptions';

/**
 * ProcessException
 * 
 * A generic process error
 */

export class ProcessException extends SystemException {

    constructor(message: string = "") {
        message = `Process Error${message ? ': ' + message : ''}`;
        super(message);
    }
}