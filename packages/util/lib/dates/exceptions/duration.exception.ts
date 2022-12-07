import { BaseException } from '../../common';

/**
 * DurationException
 *
 * DurationException represents a generic duration error.
 */

export class DurationException extends BaseException {

    constructor(message: string = "Duration error.") {
        super(message);
    }
}