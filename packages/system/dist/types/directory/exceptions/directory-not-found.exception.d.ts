import { DirectoryException } from './directory.exception';
/**
 * DirectoryNotFoundException
 *
 * An exception indicating a directory cannot be found.
 */
export declare class DirectoryNotFoundException extends DirectoryException {
    constructor(message?: string);
}
