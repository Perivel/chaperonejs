import { InvalidArgumentException } from "./invalid-argument.exception";


export class OutOfBoundsException extends InvalidArgumentException {
	constructor(message = "Argument out of bounds.") {
		super(message);
	}
}