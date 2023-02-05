import { ProcessException } from "./process.exception";

/**
 * ProcessFailedException
 * 
 * An Error indicating a process has failed.
 */

export class ProcessFailedException extends ProcessException {

    constructor(message: string = `Process exited with non-zero code`, readonly code: number = -1) {
        super(message)
    }
}