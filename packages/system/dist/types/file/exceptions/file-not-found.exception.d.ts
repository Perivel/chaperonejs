import { FileException } from './file.exception';
/**
 * FileNotFoundException
 *
 * An exception indicates a file is not found.
 */
export declare class FileNotFoundException extends FileException {
    constructor(message?: string);
}
