import { SystemException } from './../../exceptions';

export class FileStreamException extends SystemException {

    constructor(message: string = "") {
        super(`File Stream Error${message ? ': ' + message : ""}`);
    }
}