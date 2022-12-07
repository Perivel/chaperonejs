import { InvalidArgumentException } from '../../common';

export class StreetAddressException extends InvalidArgumentException {

    constructor(message: string = "Street Address Error") {
        super(message);
    }
}