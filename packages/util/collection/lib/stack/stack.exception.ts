import { CollectionException } from './../collection';

/**
 * StackException
 * 
 * A stack error.
 */

export class StackException extends CollectionException {

    constructor(message: string = "Stack exception") {
        super(message);
    }
}