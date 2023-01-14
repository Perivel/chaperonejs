import { Equatable } from '@chaperone/util';

/**
 * The Path API.
 */

export interface PathInterface extends Equatable {

    /**
     * basename()
     *
     * gets the last portion of the path.
     */

    basename(): PathInterface;

    /**
     * dirname()
     *
     * The path.dirname() method returns the directory name.
     */

    dirname(): PathInterface;

    /**
     * extension()
     *
     * gets the extension of the path.
     */

    extension(): string;

    /**
     * isAbsolute()
     *
     * determines if path is an absolute path
     */

    isAbsolute(): boolean;

    /**
     * normalize()
     *
     * normalizes the given path, resolving '..' and '.' segments.
     */

    normalize(): PathInterface;

    /**
     * segments()
     * 
     * returns an array consisting of the file segments.
     */

    segments(): string[];

    /**
     * toNamespacedPath()
     *
     * gets an equivalent namespace-prefixed path.
     *
     * This method is meaningful only on Windows systems. On POSIX systems,
     * the method is non-operational and always returns path without modifications.
     */

    toNamespacedPath(): PathInterface;
}