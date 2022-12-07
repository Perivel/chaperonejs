import { InvalidArgumentException } from "../../common";

export class EmailAddressException extends InvalidArgumentException {

    constructor(message: string = "Invalid Email Address") {
        super(message);
    }
}