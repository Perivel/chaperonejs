/// <reference types="node" />
import { File } from '../../file';
import { FileStream } from './../file-stream';
import { FileWriterOptions } from './file-writer-options.interface';
import { FileWriterInterface } from './file-writer.interface';
/**
 * FileWriter
 *
 * A FileWriter
 */
export declare class FileWriter extends FileStream implements FileWriterInterface {
    private readonly _stream;
    private readonly _encoding;
    private _isClosed;
    private _streamIsCorked;
    private readonly _batchWrites;
    private _numWrites;
    private readonly _batchSize;
    constructor(file: File, options?: FileWriterOptions);
    /**
     * _batchIsFill()
     *
     * determines if the current write batch is full.
     * @returns TRUE if the buffer is full. FALSE otherwise.
     */
    private _batchIsFull;
    /**
     * close()
     *
     * closes the file stream.
     */
    close(): Promise<void>;
    /**
     * _corkStream()
     *
     * corks the stream.
     */
    private _corkStream;
    /**
    * encoding()
    *
    * the stream encoding.
    */
    encoding(): BufferEncoding;
    /**
     * _flush()
     *
     * Flushes the buffer.
     */
    private _flush;
    /**
     * _uncorkStream()
     *
     * uncorks the stream.
     */
    private _uncorkStream;
    /**
     * write()
     *
     * writes data to the file.
     * @param x the data write to the file
     */
    write(x: string): Promise<void>;
    /**
     * writeLine()
     *
     * writes a line of data to the file.
     * @param x the data to write to te file.
     */
    writeLine(x: string): Promise<void>;
}
