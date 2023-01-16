import { DirectoryException } from './directory.exception';
/**
 * DirectoryAlreadyExistsException
 *
 * An exception indicating a directory already exists.
 */
export declare class DirectoryAlreadyExistsException extends DirectoryException {
    constructor(message?: string);
}
