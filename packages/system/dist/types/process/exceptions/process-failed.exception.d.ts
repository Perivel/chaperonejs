import { ProcessException } from "./process.exception";
/**
 * ProcessFailedException
 *
 * An Error indicating a process has failed.
 */
export declare class ProcessFailedException extends ProcessException {
    readonly code: number;
    constructor(message?: string, code?: number);
}
