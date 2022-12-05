import { BaseException } from "../../common";


export class CountryException extends BaseException {

    constructor(message: string = "Country Error") {
        super(message);
    }
}