import { FileSystemEntryException } from './../../file-system-entry';

/**
 * DirectoryException
 * 
 * A general directory error.
 */

export class DirectoryException extends FileSystemEntryException {

    constructor(message: string = "") {
        super(`Directory Error${message ? ": " + message : ''}`);
    }
}