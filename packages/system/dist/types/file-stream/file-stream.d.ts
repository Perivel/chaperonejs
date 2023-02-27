/// <reference types="node" />
import { Equatable } from '@chaperone/util';
import { File } from '../file';
import { FileStreamInterface } from './file-stream.interface';
export declare abstract class FileStream implements Equatable, FileStreamInterface {
    readonly file: File;
    readonly encoding: BufferEncoding;
    constructor(file: File, encoding: BufferEncoding);
    /**
     * close()
     *
     * closes the file stream.
     */
    abstract close(): Promise<void>;
    equals(suspect: any): boolean;
    toString(): string;
}
