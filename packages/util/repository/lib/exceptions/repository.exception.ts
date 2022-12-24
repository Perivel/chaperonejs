import { BaseException } from '@chaperone/util';

/**
 * RepositoryException
 * 
 * A generic repository exception.
 */

export class RepositoryException extends BaseException {
    
    constructor(message: string = "Repository Error") {
        super(message);
    }
}