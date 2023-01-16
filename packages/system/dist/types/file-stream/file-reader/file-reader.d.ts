/// <reference types="node" />
import { FileStream } from './../file-stream';
import { File } from './../../file';
import { FileReaderInterface } from './file-reader.interface';
import { FileReaderOptions } from './file-reader-options.interface';
/**
 * FileReader
 *
 * A FileReader class
 */
export declare class FileReader extends FileStream implements FileReaderInterface {
    private readonly _stream;
    private readonly _encoding;
    private _isClosed;
    private _bytesRead;
    private _fileSize;
    /**
     * Creates a FileReader stream.
     * @param file the file to read.
     * @param options options for reading a file.
     */
    constructor(file: File, options?: FileReaderOptions);
    private static MAX_BYTES;
    /**
     * all()
     *
     * reads all the data in the stream.
     * @throws FileStreamException when the stream cannot be read (i.e. It was closed)
     */
    all(): string;
    /**
     * close()
     *
     * closes the file stream.
     */
    close(): Promise<void>;
    /**
     * encoding()
     *
     * the stream encoding.
     */
    encoding(): BufferEncoding;
    equals(suspect: any): boolean;
    /**
     * hasNext()
     *
     * determines if there is still data left to be read.
     */
    hasNext(): Promise<boolean>;
    /**
     * next()
     *
     * gets data from the buffer, of the specified size.
     * @param size the size of data to get in bytes.
     * @param encoding the encoding
     * @return the data.
     */
    next(size?: number): Promise<string>;
}
