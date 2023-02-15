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
    private constructor();
    /**
     * Create()
     *
     * creates a FileSystem Entry instance.
     * @param path The path of the resource to create.
     * @returns the created FileSystem Entry.
     */
    static Create(path: Path | string, target: Path | string, options?: CreateLinkOptions): Promise<Link>;
    /**
     * Exist()
     *
     * determines if the symbolic specified by the path exists.
     * @param path the path to check.
     * @returns TRUE if the directory exists. FALSE otherwise.
     * @throws DirectoryException if an error occurs performing the operation.
     */
    static Exists(path: string | Path): Promise<boolean>;
    /**
     * ForPath()
     *
     * Creates a reference to a directory specified by the path.
     * @param path the path to the directory.
     * @returns An instance of the directory.
     * @throws DirectoryNotFoundException when the directory is not found.
     * @throws DirectoryException when the operation fails.
     */
    static ForPath(path: string | Path): Promise<Link>;
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
