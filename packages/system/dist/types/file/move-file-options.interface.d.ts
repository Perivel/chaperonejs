import { MoveOptions } from '../interfaces';
/**
 * MoveFileOptions
 *
 * Options for moving a file.
 */
export interface MoveFileOptions extends MoveOptions {
    override: boolean;
}
