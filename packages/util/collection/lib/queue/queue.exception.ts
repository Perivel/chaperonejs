import { CollectionException } from './../collection';

/**
 * QueueException
 * 
 * A queue error
 */
export class QueueException extends CollectionException {
    constructor(message: string = "Queue error") {
        super(message);
    }
}