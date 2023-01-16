import { ProcessException } from "./process.exception";
/**
 * ProcessFailedException
 *
 * An Error indicating a process has failed.
 */
export declare class ProcessFailedException extends ProcessException {
    readonly code: number | null;
    constructor(message?: string, code?: number | null);
}
