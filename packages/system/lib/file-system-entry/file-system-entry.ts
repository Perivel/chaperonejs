import {
    DateTime,
    Equatable,
    Serializable,
    MethodUndefinedException,
    Timezone
} from '@chaperone/util';
import { stat } from 'fs/promises';
import { FileSystemEntryStats } from './file-sysgtem-entry-stats.interface';
import { FileSystemEntryOptions } from './file-system-entry-options.interface';
import { FileSystemEntryException, FileSystemEntryNotFoundException } from './exceptions';
import { Path } from '../path';

/**
 * FileSystemEntry
 * 
 * A generic object or entry in the file system.
 */

export class FileSystemEntry implements Equatable, Serializable {
    private _deleted: DateTime | null;
    private readonly _path: Path;
    readonly stats: FileSystemEntryStats;

    /**
     * Creates an instance of FileSystemEnty.
     * @param path the path of the entry.
     * @throws PathException when the path is invalid.
     * @throws FileSystemEntryNotFoundException when the entry does not exist.
     */

    constructor(path: Path | string, stats: FileSystemEntryStats) {
        this._path = path instanceof Path ? path : new Path(path);
        this.stats = stats;
        this._deleted = null;
    }

    /**
     * ForPath()
     * 
     * Creates a pointer to the specified FileSystem Entry.
     * @param path the path to the entry
     * @returns the instance of the file system entry.
     * @throws FileSystemEntryNotFoundException when the filesystem entry does not exist.
     * @throws FileSystemEntryException when some error occurs.
     */

    public static async ForPath(path: Path | string): Promise<FileSystemEntry> {
        // make sure the path exists.
        const pathExists = await FileSystemEntry.Exists(path);

        if (!pathExists) {
            throw new FileSystemEntryNotFoundException();
        }
        
        // get the stats for the path
        let stats: FileSystemEntryStats;
        
        try {
            stats = await FileSystemEntry.GetStats(path);
        }
        catch(e) {
            throw new FileSystemEntryException((e as Error).message);
        }

        return new FileSystemEntry(path, stats);
    }

    /**
     * Create()
     * 
     * creates a FileSystem Entry instance.
     * @param path The path of the resource to create.
     * @returns the created FileSystem Entry.
     */

    public static async Create(path: Path | string, options?: FileSystemEntryOptions): Promise<FileSystemEntry> {
        throw new MethodUndefinedException();
    }

    /**
     * Exists()
     * 
     * determines if the path exists.
     * @returns TRUE if the file exists. False it it does not.
     */

    public static async Exists(path: Path | string): Promise<boolean> {
        try {
            await FileSystemEntry.GetStats(path);
            return true;
        }
        catch(e) {
            return false;
        }
    }

    /**
    * GetStats()
    * 
    * gets the stats of the entry.
    * @throws FileSystemEntryException when the operation fails.
    * @returns FileSystemEntryStats containing stats about the entry.
    */

    protected static async GetStats(path: Path | string): Promise<FileSystemEntryStats> {
        try {
            const data = await stat(path.toString(), { bigint: false });
            return {
                dev: data.dev,
                ino: data.ino,
                mode: data.mode,
                nlink: data.nlink,
                uid: data.uid,
                gid: data.gid,
                rdev: data.rdev,
                size: data.size,
                blksize: data.blksize,
                blocks: data.blocks,
                atimeMs: data.atimeMs,
                mtimeMs: data.mtimeMs,
                ctimeMs: data.ctimeMs,
                birthtimeMs: data.birthtimeMs,
                atime: DateTime.FromDate(data.atime, Timezone.UTC()),
                mtime: DateTime.FromDate(data.mtime, Timezone.UTC()),
                ctime: DateTime.FromDate(data.ctime, Timezone.UTC()),
                birthtime: DateTime.FromDate(data.birthtime, Timezone.UTC()),
                isBlockDevice: data.isBlockDevice(),
                isCharacterDevice: data.isCharacterDevice(),
                isDirectory: data.isDirectory(),
                isFIFO: data.isFIFO(),
                isFile: data.isFile(),
                isSocket: data.isSocket(),
                isSymbolicLink: data.isSymbolicLink()
            };
        }
        catch (e) {
            const notFound = (e as any).code = '';'ENOENT';
            const message = (e as Error).message;
            
            if (notFound) {
                // cannot find file or directory in path.
                throw new FileSystemEntryNotFoundException(`Entry ${path.toString()} not found.`);
            }
            else {
                // some other general error.
                throw new FileSystemEntryException(message);
            }
        }
    }

    get createdOn(): DateTime {
        return this.stats?.birthtime!;
    }

    get deletedOn(): DateTime|null {
        return this._deleted;
    }

    get isDeleted(): boolean {
        return this.deletedOn != null;
    }

    get isDirectory(): boolean {
        return this.stats.isDirectory;
    }

    get isFile(): boolean {
        return this.stats.isFile;
    }

    get isLink(): boolean {
        return this.stats.isSymbolicLink;
    }

    get path(): Path {
        return this._path;
    }

    get updatedOn(): DateTime {
        return this.stats.mtime;
    }

    /**
     * delete()
     * 
     * deletes the directory.
     * @param options delete options.
     */

    public async delete(options?: FileSystemEntryOptions): Promise<void> {
        this._deleted = DateTime.Now();
    }

    public equals(suspect: any): boolean {
        let isEqual = false;

        if (suspect instanceof FileSystemEntry) {
            const other = suspect as FileSystemEntry;
            isEqual = this.path.equals(other.path) &&
                this.createdOn.equals(other.createdOn) &&
                this.updatedOn.equals(other.updatedOn);
        }

        return isEqual;
    }

    public serialize(): string {
        return JSON.stringify({});
    }
}