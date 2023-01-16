import { FileInterface } from '../file';
import { LinkInterface } from '../link';
export interface DirectoryInterface {
    /**
     * contents()
     *
     * gets the contents of the directory.
     */
    contents(): Promise<Array<LinkInterface | DirectoryInterface | FileInterface>>;
}
