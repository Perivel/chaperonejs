import { BaseException } from '@chaperone/util';

/**
 * CollectionException
 * 
 * A generic collection error.
 */

export class CollectionException extends BaseException {

    constructor(message: string = "Collection error") {
        super(message);
    }
}