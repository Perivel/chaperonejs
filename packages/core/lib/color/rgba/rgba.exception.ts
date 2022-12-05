import { ColorException } from '././../exceptions';

/**
 * RGBAException
 * 
 * An RGBA value error.
 */

export class RGBAException extends ColorException {
    constructor(message: string = "RGBA Error") {
        super(message);
    }
}