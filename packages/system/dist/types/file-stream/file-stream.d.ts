/// <reference types="node" />
import { Equatable } from '@chaperone/util';
import { File } from '../file';
import { FileStreamInterface } from './file-stream.interface';
export declare abstract class FileStream implements Equatable, FileStreamInterface {
    private readonly _file;
    constructor(file: File);
    /**
     * close()
     *
     * closes the file stream.
     */
    abstract close(): Promise<void>;
    /**
     * file()
     *
     * the source file of the stream.
     */
    file(): File;
    /**
     * encoding()
     *
     * the stream encoding.
     */
    abstract encoding(): BufferEncoding;
    equals(suspect: any): boolean;
    toString(): string;
}
