import { Copiable, Movable, Renamable } from '../interfaces';
import { File } from './../file';
import { Link } from './../Link';
import { Path } from '../path';
import { FileSystemEntry } from './../file-system-entry';
import { DirectoryInterface } from './directory.interface';
import { CreateDirectoryOptions } from './create-directory-options.interface';
import { CopyDirectoryOptions } from './copy-directory-options.interface';
import { DeleteDirectoryOptions } from './delete-directory-options.interface';
import { MoveDirectoryOptions } from './move-directory-options.interface';
/**
 * Directory
 *
 * A File system Directory.
 */
export declare class Directory extends FileSystemEntry implements DirectoryInterface, Copiable, Movable, Renamable {
    /**
     * Creates a reference to a directory.
     * @param path the directory path.
     * @throws DirectoryNotFoundExeption when the directory is not found.
     */
    constructor(path: Path | string);
    /**
     * Create()
     *
     * creates a FileSystem Entry instance.
     * @param path The path of the resource to create.
     * @returns the created FileSystem Entry.
     */
    static Create(path: Path | string, options?: CreateDirectoryOptions): Promise<Directory>;
    /**
     * Current()
     *
     * Gets the current working directory.
     * @returns The current working directory.
     */
    static Current(): Directory;
    /**
     * contents()
     *
     * gets the contents of the directory.
     */
    contents(): Promise<Array<Link | Directory | File>>;
    /**
     * convertToObjects()
     *
     * converts a list of paths into the corresponding objects.
     * @param paths a list of file paths to convert.
     * @returns a list of objects.
     */
    private convertToObjects;
    /**
     * copy()
     *
     * copies the directory to the specified path.
     * @param to the destination to copy to.
     * @param options copy options.
     * @throws DirectoryAlreadyExistsException when the to path already exists.
     * @throws DirectoryException when the operation fails.
     */
    copy(to: Path | string, options?: CopyDirectoryOptions): Promise<void>;
    /**
     * delete()
     *
     * deletes the directory.
     * @param options delete options.
     * @throws DirectoryException when the operation fails.
     */
    delete(options?: DeleteDirectoryOptions): Promise<void>;
    equals(suspect: any): boolean;
    /**
     * move()
     *
     * moves the filesystem entry to the specified path.
     * @param to the destination to move the filesystem entry to.
     * @param options move options.
     * @returns the copied movable object.
     * @throws DirectoryAlreadyExistsException when the destination already exists.
     * @throws DirectoryException when the operation fails.
     */
    move(to: Path | string, options?: MoveDirectoryOptions): Promise<Directory>;
    /**
     * rename()
     *
     * renames the filesystem entry.
     * @param newName the new name of the directory.
     */
    rename(newName: string): Promise<Directory>;
    serialize(): string;
}
