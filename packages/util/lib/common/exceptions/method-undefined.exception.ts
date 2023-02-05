import { BaseException } from "./base.exception";

/**
 * MethodUndefinedException
 *
 * MethodUndefinedException is an error indicating that a method
 * that was called is undefined.
 */

export class MethodUndefinedException extends BaseException {

	constructor(message = "Method undefined.") {
		super(message);
	}
}
