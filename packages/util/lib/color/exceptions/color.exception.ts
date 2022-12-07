import { BaseException } from '../../common';

/**
 * ColorException
 * 
 * A generic color error.
 */

export class ColorException extends BaseException {

    constructor(message: string = "Color Error") {
        super(message);
    }
}