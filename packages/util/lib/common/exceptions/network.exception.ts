import { BaseException } from "./base.exception";

/**
 * NetworkException
 *
 * NetworkException indicates a network exception has occured.
 */

export class NetworkException extends BaseException {

	constructor(message = "Network Error") {
		super(message);
	}
}