import { DateTime } from '@chaperone/util';

/**
 * FileSystemEntryStats
 * 
 * file system stats.
 */

export interface FileSystemEntryStats {
    dev: number|bigint,
    ino: number|bigint,
    mode: number|bigint,
    nlink: number|bigint,
    uid: number|bigint,
    gid: number|bigint,
    rdev: number|bigint,
    size: number|bigint,
    blksize: number|bigint,
    blocks: number|bigint,
    atimeMs: number|bigint,
    mtimeMs: number|bigint,
    ctimeMs: number|bigint,
    birthtimeMs: number|bigint,
    atime: DateTime,
    mtime: DateTime,
    ctime: DateTime,
    birthtime: DateTime,
    isBlockDevice: boolean,
    isCharacterDevice: boolean,
    isDirectory: boolean,
    isFIFO: boolean,
    isFile: boolean,
    isSocket: boolean,
    isSymbolicLink: boolean
}