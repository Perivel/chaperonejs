import { BaseException } from "./../exceptions";

/**
 * RangeException
 * 
 * A Range Error
 */
export class RangeException extends BaseException {

	constructor(message = "Range Error") {
		super(message);
	}
}