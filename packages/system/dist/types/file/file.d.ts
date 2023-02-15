import { Copiable, Movable, Renamable } from '../interfaces';
import { Path } from '../path';
import { FileSystemEntry, FileSystemEntryOptions } from './../file-system-entry';
import { CopyFileOptions } from './copy-file-options.interface';
import { DeleteFileOptions } from './dlete-file-options.interface';
import { FileInterface } from './file.interface';
import { MoveFileOptions } from './move-file-options.interface';
/**
 * File
 *
 * A File
 */
export declare class File extends FileSystemEntry implements FileInterface, Movable, Copiable, Renamable {
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
    static Create(path: Path | string, options?: FileSystemEntryOptions): Promise<File>;
    /**
     * Exist()
     *
     * determines if the file specified by the path exists.
     * @param path the path to check.
     * @returns TRUE if the file exists. FALSE otherwise.
     * @throws FileException if an error occurs performing the operation.
     */
    static Exists(path: string | Path): Promise<boolean>;
    /**
     * ForPath()
     *
     * Creates a reference to a File specified by the path.
     * @param path the path to the directory.
     * @returns An instance of the directory.
     * @throws FileNotFoundException when the file is not found.
     * @throws FileException when the operation fails.
     */
    static ForPath(path: string | Path): Promise<File>;
    /**
     * copy()
     *
     * copies the directory to the specified path.
     * @param to the destination to copy the file to.
     * @param options copy options.
     * @throws FileException when the file is deleted.
     */
    copy(to: Path | string, options?: CopyFileOptions): Promise<void>;
    /**
     * delete()
     *
     * deletes the directory.
     * @returns the deleted directory.
     * @param options delete options.
     */
    delete(options?: DeleteFileOptions): Promise<void>;
    equals(suspect: any): boolean;
    /**
     * move()
     *
     * moves the filesystem entry to the specified path.
     * @param to the destination to move the filesystem entry to.
     * @param options move options.
     * @returns the copied FilSystem Entry.
     */
    move(to: Path | string, options?: MoveFileOptions): Promise<File>;
    /**
     * rename()
     *
     * renames the filesystem entry.
     * @param newName the new name of the directory.
     * @throws PathException when the new name is invalid.
     * @throws FileException when the operation encounters an error.
     */
    rename(newName: string): Promise<File>;
    serialize(): string;
}
