import { FILE } from 'dns';
import { copyFile, writeFile, rm, rename } from 'fs/promises';
import { Copiable, Movable, Renamable } from '../interfaces';
import { Path } from '../path';
import { FileSystemEntry, FileSystemEntryException, FileSystemEntryNotFoundException, FileSystemEntryOptions, FileSystemEntryStats } from './../file-system-entry';
import { CopyFileOptions } from './copy-file-options.interface';
import { DeleteFileOptions } from './dlete-file-options.interface';
import { FileAlreadyExistsException, FileException, FileNotFoundException } from './exceptions';
import { FileInterface } from './file.interface';
import { MoveFileOptions } from './move-file-options.interface';

/**
 * File
 * 
 * A File
 */

export class File extends FileSystemEntry implements FileInterface, Movable, Copiable, Renamable {

    /**
     * Creates a file instance.
     * @param path the path to the file.
     * @throws FileNotFoundException when the file is not found.
     * @throws PathException when the path is invalid.
     */

    private constructor(path: Path | string, stats: FileSystemEntryStats) {
        super(path, stats);
    }

    /**
     * Create()
     * 
     * creates a FileSystem Entry instance.
     * @param path The path of the resource to create.
     * @returns the created FileSystem Entry.
     */

    public static async Create(path: Path | string, options?: FileSystemEntryOptions): Promise<File> {
        // make sure the file does not already exists.
        const pathExists = await File.Exists(path);
        
        if (pathExists) {
            throw new FileAlreadyExistsException();
        }

        // create the file.
        const filePath = path instanceof Path ? path : new Path(path.toString());
        try {
            await writeFile(filePath.toString(), "");
        }
        catch (e) {
            throw new FileException((e as Error).message);
        }
        return File.ForPath(filePath);
    }

    /**
     * Exist()
     * 
     * determines if the file specified by the path exists.
     * @param path the path to check.
     * @returns TRUE if the file exists. FALSE otherwise.
     * @throws FileException if an error occurs performing the operation.
     */

    public static async Exists(path: string | Path): Promise<boolean> {
        try {
            const pathExists = await super.Exists(path);
            const stats = await File.GetStats(path);
            return pathExists && stats.isFile;
        }
        catch(e) {
            throw new FileException((e as Error).message);
        }
    }

    /**
     * ForPath()
     * 
     * Creates a reference to a File specified by the path.
     * @param path the path to the directory.
     * @returns An instance of the directory.
     * @throws FileNotFoundException when the file is not found.
     * @throws FileException when the operation fails.
     */

    public static async ForPath(path: string | Path): Promise<File> {
        try {
            const exists = await File.Exists(path);

            if (!exists) {
                throw new FileNotFoundException();
            }

            // get the stats
            const stats = await File.GetStats(path);

            // return the reference
            return new File(path, stats);
        }
        catch(e) {
            if (e instanceof FileSystemEntryException) {
                throw new FileException((e as Error).message);
            }
            else {
                throw e;
            }
        }
    }

    /**
     * copy()
     * 
     * copies the directory to the specified path.
     * @param to the destination to copy the file to.
     * @param options copy options.
     * @throws FileException when the file is deleted.
     */

    public async copy(to: Path | string, options?: CopyFileOptions): Promise<void> {
        // resolve the arguments.
        const resolvedDestination = to instanceof Path ? to : new Path(to);
        let resolvedOptions: CopyFileOptions;

        if (options) {
            resolvedOptions = {
                mode: options.mode ? options.mode : null,
                override: options.override ? options.override : false
            };
        }
        else {
            resolvedOptions = {
                mode: null,
                override: false
            }
        }

        // make sure the destination file does not already exist.
        const destinationInUse = await FileSystemEntry.Exists(resolvedDestination);

        if (destinationInUse) {
            throw new FileAlreadyExistsException();
        }

        // make sure the file has not been deleted.
        if (this.isDeleted) {
            throw new FileException();
        }

        // copy the file.
        try {
            await copyFile(this.path.toString(), resolvedDestination.toString(), resolvedOptions.mode!);
        }
        catch (e) {
            throw new FileException((e as Error).message);
        }
    }

    /**
     * delete()
     * 
     * deletes the directory.
     * @returns the deleted directory.
     * @param options delete options.
     */

    public async delete(options?: DeleteFileOptions): Promise<void> {
        // resolve options
        let resolvedOptions: DeleteFileOptions;

        if (options) {
            resolvedOptions = {
                recursive: options.recursive ? options.recursive : false,
                force: options.force ? options.force : false
            };
        }
        else {
            resolvedOptions = {
                recursive: false,
                force: false
            };
        }

        // delete the file.
        try {
            await rm(this.path.toString(), {
                force: resolvedOptions.force,
                recursive: resolvedOptions.recursive
            });
            super.delete();
        }
        catch (e) {
            throw new FileException((e as Error).message);
        }
    }

    public equals(suspect: any): boolean {
        if (suspect instanceof File) {
            return super.equals(suspect);
        }
        else {
            return false;
        }
    }

    /**
     * move()
     * 
     * moves the filesystem entry to the specified path.
     * @param to the destination to move the filesystem entry to.
     * @param options move options.
     * @returns the copied FilSystem Entry.
     */

    public async move(to: Path | string, options?: MoveFileOptions): Promise<File> {
        const resolvedDestination = to instanceof Path ? to : new Path(to);
        let resolvedOptions: MoveFileOptions;

        if (options) {
            resolvedOptions = {
                override: options.override ? options.override : false
            }
        }
        else {
            resolvedOptions = {
                override: false
            }
        }

        // make sure the destination is available.
        const destinationInUse = await FileSystemEntry.Exists(resolvedDestination);

        if (destinationInUse) {
            throw new FileAlreadyExistsException();
        }

        if (destinationInUse && !resolvedOptions.override) {
            throw new FileAlreadyExistsException();
        }

        // move the file.
        try {
            await rename(this.path.toString(), resolvedDestination.toString());
            return await File.ForPath(resolvedDestination);
        }
        catch (e) {
            throw new FileException((e as Error).message);
        }
    }

    /**
     * rename()
     * 
     * renames the filesystem entry.
     * @param newName the new name of the directory.
     * @throws PathException when the new name is invalid.
     * @throws FileException when the operation encounters an error.
     */

    public async rename(newName: string): Promise<File> {
        // resolve the new file path.
        const resolvedFileName = Path.FromSegments(this.path.dirname(), newName);

        // rename the file.
        try {
            await rename(this.path.toString(), resolvedFileName.toString());
            return await File.ForPath(resolvedFileName);
        }
        catch (e) {
            throw new FileException((e as Error).message);
        }
    }

    public serialize(): string {
        return JSON.stringify({
            path: this.path.toString(),
            created_on: this.createdOn.toString(),
            updated_on: this.updatedOn.toString()
        });
    }
}