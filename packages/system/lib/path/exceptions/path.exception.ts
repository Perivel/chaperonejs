import { SystemException } from './../../exceptions';

/**
 * PathException
 * 
 * A general path error.
 */

export class PathException extends SystemException {

    constructor(message: string = "") {
        super(`Path Error${message ? ': ' + message : ''}`);
    }
}