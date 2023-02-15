import { readlink, symlink, unlink } from 'fs/promises';
import { Path } from '../path';
import { FileSystemEntry, FileSystemEntryException, FileSystemEntryNotFoundException, FileSystemEntryStats } from './../file-system-entry';
import { LinkType } from './enums';
import { CreateLinkOptions } from './create-link-options.interface';
import { LinkInterface } from './link.interface';
import { LinkAlreadyExistsException, LinkException, LinkNotFoundException } from './exceptions';
import { DeleteLinkOptions } from './delete-link-options.interface';

/**
 * Link
 * 
 * A Symbolic Link
 */

export class Link extends FileSystemEntry implements LinkInterface {

    private _target: Path | null;

    /**
     * Creates a file instance.
     * @param path the path to the file.
     * @throws FileNotFoundException when the file is not found.
     * @throws PathException when the path is invalid.
     */

    private constructor(path: Path | string, stats: FileSystemEntryStats) {
        super(path, stats);
        this._target = null;
    }

    /**
     * Create()
     * 
     * creates a FileSystem Entry instance.
     * @param path The path of the resource to create.
     * @returns the created FileSystem Entry.
     */

    public static async Create(path: Path | string, target: Path | string, options?: CreateLinkOptions): Promise<Link> {
        // make sure the file does not already exists.
        const pathExists = await Link.Exists(path);
        
        if (pathExists) {
            throw new LinkAlreadyExistsException();
        }

        // create the Link.
        const linkPath = path instanceof Path ? path : new Path(path.toString());
        const targetPath = target instanceof Path ? target : new Path(target);
        let resolvedOptions: CreateLinkOptions;

        if (options) {
            resolvedOptions = {
                type: options.type ? options.type : LinkType.File
            };
        }
        else {
            resolvedOptions = {
                type: LinkType.File
            }
        }

        try {
            await symlink(targetPath.toString(), linkPath.toString(), resolvedOptions.type?.toString());
        }
        catch (e) {
            throw new LinkException((e as Error).message);
        }

        return await Link.ForPath(linkPath);
    }

    /**
     * Exist()
     * 
     * determines if the symbolic specified by the path exists.
     * @param path the path to check.
     * @returns TRUE if the directory exists. FALSE otherwise.
     * @throws DirectoryException if an error occurs performing the operation.
     */

    public static async Exists(path: string | Path): Promise<boolean> {
        try {
            const pathExists = await super.Exists(path);
            const stats = await Link.GetStats(path);
            return pathExists && stats.isSymbolicLink;
        }
        catch(e) {
            throw new LinkException((e as Error).message);
        }
    }

    /**
     * ForPath()
     * 
     * Creates a reference to a directory specified by the path.
     * @param path the path to the directory.
     * @returns An instance of the directory.
     * @throws DirectoryNotFoundException when the directory is not found.
     * @throws DirectoryException when the operation fails.
     */

    public static async ForPath(path: string | Path): Promise<Link> {
        try {
            // Make sure the directory exists
            const exists = await Link.Exists(path);

            if (!exists) {
                throw new LinkNotFoundException();
            }

            // get the stats
            const stats = await Link.GetStats(path);

            // return the reference
            return new Link(path, stats);
        }
        catch(e) {
            if (e instanceof FileSystemEntryException) {
                throw new LinkException((e as Error).message);
            }
            else {
                throw e;
            }
        }
    }


    /**
     * delete()
     * 
     * deletes the directory.
     * @returns the deleted directory.
     * @param options delete options.
     */

    public async delete(options?: DeleteLinkOptions): Promise<void> {

        // delete the link.
        try {
            await unlink(this.path.toString());
            super.delete();
        }
        catch (e) {
            throw new LinkException((e as Error).message);
        }
    }

    public equals(suspect: any): boolean {
        if (suspect instanceof Link) {
            return super.equals(suspect);
        }
        else {
            return false;
        }
    }

    /**
     * isValid()
     * 
     * determines if the target of the link exists.
     */

    public async isValid(): Promise<boolean> {
        let valid = false;

        try {
            const res = await this.target();
            valid = res !== null;
        }
        catch(e) {}

        return valid;
    }

    public serialize(): string {
        return JSON.stringify({
            path: this.path.toString(),
            created_on: this.createdOn.toString(),
            updated_on: this.updatedOn.toString()
        });
    }

    /**
     * target()
     * 
     * gets the target object of the link.
     * @throws LinkException when the operation fails.
     * @returns the path targeted by the link.
     */

    public async target(): Promise<Path | null> {
        if (!this._target) {
            try {
                const targetPath = await readlink(this.path.toString());
                this._target = new Path(targetPath);
            }
            catch (e) {
                throw new LinkException((e as Error).message);
            }
        }
        return this._target;
    }
}