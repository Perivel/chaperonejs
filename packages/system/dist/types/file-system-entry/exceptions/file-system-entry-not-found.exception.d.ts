import { FileSystemEntryException } from './file-system-entry.exception';
/**
 * FileSystemEntryNotFoundException
 *
 * An error indicating a FileSystem Entry was not found.
 */
export declare class FileSystemEntryNotFoundException extends FileSystemEntryException {
    constructor(message?: string);
}
