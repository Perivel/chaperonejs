import { StreetAddressException } from './street-address.exception';

export class StreetException extends StreetAddressException {

    constructor(message: string = "Invalid Street") {
        super(message);
    }
}