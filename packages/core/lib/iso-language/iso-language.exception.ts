import { BaseException } from './../common';

/**
 * IsoLanguageException
 * 
 * An IsoLanguage Error
 */

export class IsoLanguageException extends BaseException {
    constructor(message: string = "Language Error") {
        super(message);
    }
}