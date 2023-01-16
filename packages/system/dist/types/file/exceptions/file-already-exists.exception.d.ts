import { FileException } from './file.exception';
/**
 * FileAlreadyExistsException
 *
 * an error indicating a file already exists.
 */
export declare class FileAlreadyExistsException extends FileException {
    constructor(message?: string);
}
