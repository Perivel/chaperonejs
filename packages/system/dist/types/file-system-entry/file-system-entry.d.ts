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
    private _deleted;
    private readonly _path;
    readonly stats: FileSystemEntryStats;
    /**
     * Creates an instance of FileSystemEnty.
     * @param path the path of the entry.
     * @throws PathException when the path is invalid.
     * @throws FileSystemEntryNotFoundException when the entry does not exist.
     */
    constructor(path: Path | string, stats: FileSystemEntryStats);
    /**
     * ForPath()
     *
     * Creates a pointer to the specified FileSystem Entry.
     * @param path the path to the entry
     * @returns the instance of the file system entry.
     * @throws FileSystemEntryNotFoundException when the filesystem entry does not exist.
     * @throws FileSystemEntryException when some error occurs.
     */
    static ForPath(path: Path | string): Promise<FileSystemEntry>;
    /**
     * Create()
     *
     * creates a FileSystem Entry instance.
     * @param path The path of the resource to create.
     * @returns the created FileSystem Entry.
     */
    static Create(path: Path | string, options?: FileSystemEntryOptions): Promise<FileSystemEntry>;
    /**
     * Exists()
     *
     * determines if the path exists.
     * @returns TRUE if the file exists. False it it does not.
     */
    static Exists(path: Path | string): Promise<boolean>;
    /**
    * GetStats()
    *
    * gets the stats of the entry.
    * @throws FileSystemEntryException when the operation fails.
    * @returns FileSystemEntryStats containing stats about the entry.
    */
    protected static GetStats(path: Path | string): Promise<FileSystemEntryStats>;
    get createdOn(): DateTime;
    get deletedOn(): DateTime | null;
    get isDeleted(): boolean;
    get isDirectory(): boolean;
    get isFile(): boolean;
    get isLink(): boolean;
    name(): string;
    get path(): Path;
    get updatedOn(): DateTime;
    /**
     * delete()
     *
     * deletes the directory.
     * @param options delete options.
     */
    delete(options?: FileSystemEntryOptions): Promise<void>;
    equals(suspect: any): boolean;
    serialize(): string;
}
