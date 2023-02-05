

/**
 * BaseException
 *
 * DomainException represents a generic domain exception.
 */

export class BaseException extends Error {

	constructor(message = "A domain error occured.") {
		super(message);
	}
}