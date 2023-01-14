import { BaseException } from '@chaperone/util';
/**
 * ContainerException
 * 
 * The base exception class.
 */

export class ContainerException extends BaseException {
    constructor(message: string = "Container Error") {
        super(message);
    }
}