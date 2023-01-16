import { DateTime, Equatable, Serializable } from '@chaperone/util';
import { FileSystemEntryStats } from './file-sysgtem-entry-stats.interface';
import { FileSystemEntryOptions } from './file-system-entry-options.interface';
import { Path } from '../path';
/**
 * FileSystemEntry
 *
 * A generic object or entry in the file system.
 */
export declare class FileSystemEntry implements Equatable, Serializable {
    private _created;
    private _updated;
    private _deleted;
    private readonly _path;
    private _stats;
    /**
     * Creates an instance of FileSystemEnty.
     * @param path the path of the entry.
     * @throws PathException when the path is invalid.
     * @throws FileSystemEntryNotFoundException when the entry does not exist.
     */
    constructor(path: Path | string);
    /**
     * Create()
     *
     * creates a FileSystem Entry instance.
     * @param path The path of the resource to create.
     * @returns the created FileSystem Entry.
     */
    static Create(path: Path | string, options?: FileSystemEntryOptions): Promise<FileSystemEntry>;
    createdOn(): DateTime;
    /**
     * delete()
     *
     * deletes the directory.
     * @param options delete options.
     */
    delete(options?: FileSystemEntryOptions): Promise<void>;
    deletedOn(): DateTime | null;
    equals(suspect: any): boolean;
    /**
     * isDeleted()
     *
     * determines if the entry is deleted.
     */
    isDeleted(): boolean;
    /**
     * isDirectory()
     *
     * determines if the entry is a directory.
     * @returns TRUE if the entry is a directory. FALSE otherwise.
     * @throws FileSystemEntryException when the operation fails.
     */
    isDirectory(): Promise<boolean>;
    /**
     * isFile()
     *
     * determines if the entry is a file.
     * @returns TRUE if the entry is a file. FALSE otherwise.
     * @throws FileSystemEntryException when the operation fails.
     */
    isFile(): Promise<boolean>;
    /**
     * isLink()
     *
     * determines if the entry is a link.
     * @returns TRUE if the entry is a link. FALSE otherwise.
     * @throws FileSystemEntryException when the operation fails.
     */
    isLink(): Promise<boolean>;
    /**
     * path()
     *
     * returns the path.
     * @returns the path.
     */
    path(): Path;
    /**
     * pathExists()
     *
     * determines if the path exists.
     * @returns TRUE if the file exists. False it it does not.
     */
    protected pathExists(path: Path | string): Promise<boolean>;
    /**
     * stats()
     *
     * gets the stats of the entry.
     * @throws FileSystemEntryException when the operation fails.
     */
    stats(): Promise<FileSystemEntryStats>;
    serialize(): string;
    /**
     * setDeleted()
     *
     * marks the entry as deleted.
     */
    setDeleted(): void;
    updatedOn(): DateTime;
}
