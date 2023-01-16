import { Path } from '../path';
import { FileSystemEntry } from './../file-system-entry';
import { CreateLinkOptions } from './create-link-options.interface';
import { LinkInterface } from './link.interface';
import { DeleteLinkOptions } from './delete-link-options.interface';
/**
 * Link
 *
 * A Symbolic Link
 */
export declare class Link extends FileSystemEntry implements LinkInterface {
    private _target;
    /**
     * Creates a file instance.
     * @param path the path to the file.
     * @throws FileNotFoundException when the file is not found.
     * @throws PathException when the path is invalid.
     */
    constructor(path: Path | string);
    /**
     * Create()
     *
     * creates a FileSystem Entry instance.
     * @param path The path of the resource to create.
     * @returns the created FileSystem Entry.
     */
    static Create(path: Path | string, target: Path | string, options?: CreateLinkOptions): Promise<Link>;
    /**
     * delete()
     *
     * deletes the directory.
     * @returns the deleted directory.
     * @param options delete options.
     */
    delete(options?: DeleteLinkOptions): Promise<void>;
    equals(suspect: any): boolean;
    /**
     * isValid()
     *
     * determines if the target of the link exists.
     */
    isValid(): Promise<boolean>;
    serialize(): string;
    /**
     * target()
     *
     * gets the target object of the link.
     * @throws LinkException when the operation fails.
     * @returns the path targeted by the link.
     */
    target(): Promise<Path | null>;
}
