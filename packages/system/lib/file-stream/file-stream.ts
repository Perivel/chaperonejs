import { Equatable } from '@chaperone/util';
import { File } from '../file';
import { FileStreamInterface } from './file-stream.interface';

export abstract class FileStream implements Equatable, FileStreamInterface {

    readonly file: File;
    readonly encoding: BufferEncoding;

    constructor(file: File, encoding: BufferEncoding) {
        this.file = file;
        this.encoding = encoding;
    }

    /**
     * close()
     * 
     * closes the file stream.
     */

    public abstract close(): Promise<void>;

    public equals(suspect: any): boolean {
        let isEqual = false;

        if (suspect instanceof FileStream) {
            const other = suspect as FileStream;
            isEqual = this.file.equals(other.file);
        }

        return isEqual;
    }

    public toString(): string {
        return `Stream for file ${this.file.path.toString()}`;
    }
}