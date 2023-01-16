import { FileSystemEntryException } from './../../file-system-entry';
/**
 * DirectoryException
 *
 * A general directory error.
 */
export declare class DirectoryException extends FileSystemEntryException {
    constructor(message?: string);
}
