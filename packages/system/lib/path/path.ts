import path, * as NodePath from 'path';
import { Stack, Queue } from '@chaperone/util/collection';
import { PathInterface } from './path.interface';
import { PathException } from './exceptions';
import { PathInstruction } from './path-instruction.enum';

/**
 * Path
 *
 * A utility class for working with file and directory paths
 */

export class Path implements PathInterface {

    private static RESTRICTED = /[\[\]#%&{}<>*?\s\b\0$!'"@|‘“+^`]/g;
    private static POSIX_RESTRICTED = /[\\:]/g;x
    private static WINDOWS_RESTRICTED = /[\/]/g;

    private readonly _value: string;

    /**
     * Creates a Path instance.
     * @param value the value of the path.
     * @throws PathException when the path is invalid.
     */

    constructor(value: string) {
        const pathVal = value.trim();
        if (this.isValidPath(pathVal)) {
            this._value = pathVal.replace(/\\|\//g, NodePath.sep);
        }
        else {
            throw new PathException("Invalid Path: " + pathVal);
        }
    }

    /**
     * Delimiter()
     *
     * Provides the platform-specific path delimiter.
     * - Windows: ";"
     * - POSIX: ":"
     */

    public static Delimiter = NodePath.delimiter;

    /**
     * FromSegments()
     *
     * Creates a Path from one or more segments.
     * @param segments the segnents of the path to create.
     * @returns the generated Path
     * @throws PathException when the segments are invalid.
     */

    public static FromSegments(...segments: Array<string | Path>): Path {
        const parsedSegments = new Stack<string>();
        Path._BuildPath(segments, parsedSegments);
        return new Path(parsedSegments.toArray().reverse().join(Path.Separator));
    }

    /**
     * Separator
     *
     * gets he platform-specific path segment separator.
     * - Windows: \
     * - POSIX: /
     */

    public static Separator = NodePath.sep;


    /**
     * basename()
     *
     * gets the last portion of the path.
     */

    public basename(): Path {
        return new Path(NodePath.basename(this.toString()));
    }

    /**
     * dirname()
     *
     * gets the directory name of the path.
     */

    public dirname(): Path {
        return new Path(NodePath.dirname(this.toString()));
    }

    public equals(suspect: any): boolean {
        let isEqual = false;

        if (suspect instanceof Path) {
            const other = suspect as Path;
            isEqual = this.toString() === other.toString();
        }

        return isEqual;
    }

    /**
     * extension()
     *
     * gets the extension of the path.
     */

    public extension(): string {
        return NodePath.extname(this.toString());
    }

    /**
    * isAbsolute()
    *
    * determines if path is an absolute path
    */

    public isAbsolute(): boolean {
        return NodePath.isAbsolute(this.toString());
    }

    /**
     * normalize()
     *
     * normalizes the given path, resolving '..' and '.' segments.
     */

    public normalize(): Path {
        return new Path(NodePath.normalize(this.toString()));
    }

    /**
     * segments()
     * 
     * returns an array consisting of the file segments.
     */

    public segments(): string[] {
        return this.toString().split(Path.Separator);
    }

    /**
     * toNamespacedPath()
     *
     * gets an equivalent namespace-prefixed path.
     *
     * This method is meaningful only on Windows systems. On POSIX systems,
     * the method is non-operational and always returns path without modifications.
     */

    public toNamespacedPath(): Path {
        return new Path(NodePath.toNamespacedPath(this.toString()));
    }

    public toString(): string {
        return this._value;
    }

    // =======================================================================
    // helpers
    // =======================================================================

    /**
     * isValidPath()
     * 
     * determines if a path is valid.
     * @param suspect the string to test.
     * @returns TRUE if the path is valid. FALSE otherwise.
     * @note This method does not work correctly yet. We need some algorithm to validate paths for any operating system.
     * Current solution produces incorrect responses. For now, we will just make this function always return
     * TRUE when the path is not empty.. And then modify it at a later version.
     */

    private isValidPath(suspect: string): boolean {
        // make sure the path is not an empty string.
        if (suspect.length === 0) {
            return false;
        }

        // check for restricted characters
        const isWindows = process.platform === 'win32';

        if (Path.RESTRICTED.test(suspect)) {
            return false;
        }

        if (isWindows && Path.WINDOWS_RESTRICTED.test(suspect)) {
            return false;
        }
        else if (Path.POSIX_RESTRICTED.test(suspect)) {
            return false;
        }

        return true;
    }

    /**
     * _BuildPathString()
     * 
     * Creates a valid path string from the provided segments.
     * @param segments the segments to process.
     * @note The built path will be in reverse order.
     * @note This function needs to be redone to improve performance.
     */

    private static _BuildPath(segments: Array<string | Path>, stack: Stack<string>): void {
        if (segments.length > 0) {
            const isHead = stack.isEmpty;
            const results = Path._NormalizeSegment(segments[0]);
            let seg: PathInstruction | string;

            while (!results.isEmpty) {
                seg = results.remove();
                if (typeof seg === 'string') {
                    stack.push(seg);
                }
                else {
                    switch (seg) {
                        case PathInstruction.BackStep:
                            if (!isHead) {
                                stack.pop();
                            }
                            else {
                                throw new PathException('Cannot backtrack from root backtrack from root directory.');
                            }
                            break;
                        case PathInstruction.HomeDirectory:
                            if (isHead) {
                                stack.push('~');
                            }
                            else {
                                throw new PathException('You can only specify the home directory in the beginning of the path.');
                            }
                            break;
                        default:
                            // here we know it is a Current Directory instruction
                            if (isHead) {
                                stack.push(process.cwd());
                            }
                    }
                }
            }

            segments.shift();
            Path._BuildPath(segments, stack);
        }
    }

    /**
     * _NormalizeSegment()
     * 
     * Attempts to normalize a path segment.
     * @param dirty the dirty segment to normalize.
     */

    private static _NormalizeSegment(dirty: string | Path): Queue<string | PathInstruction> {
        /*
         * Our goal here is to convert a path segment into a series of PathInstructions for which a Path can be constructed.
         * The dirty input can be a string or a Path instance, in which the value can be a single path segment, such as a file or folder name,
         * or a path pattern in and of itself.
         * 
         * Path segments can fall into one of the following categories.
         * 1. A Home Directory instruction (~, /, //, \, \\): We convert these into a PathInstruction.HomeDirectory instruction.
         * 2. A Current Working Directory instruction (./, .\): We convert this into a PathInstruction.CurrentDirectoryInstruction
         * 3. A Backstep instruction (../, ..\): We convert this into a PathInstruction.Backstep instruction.
         * 4. A regular string: We assume a regular string to just be a file or directory name. So, we just add it to the instruction set as is.
         * 
         * Note:
         * Since the input segments can be either a path segment or a path string in and of itself, we use the following RegExp to split the path into its segments.
         * 
         * /(\/|\\)/gm
         * 
         * This RegExp splits the string using the "\" and "/" characters. As such expressions like "\\" will be converted into an empty string. And, expressions like 
         * "./" will be converted to ".".
        */

        let candidate = dirty.toString().split(/(\/|\\)/gm);
        const instructions = new Queue<string | PathInstruction>();

        candidate.forEach(segment => {
            if (segment === '..') {
                // backstep
                instructions.add(PathInstruction.BackStep);
            }
            else if (segment == '') {
                // current directory.
                instructions.add(PathInstruction.CurrentDirectory);
            }
            else if (['~', '/', '\\'].includes(segment)) {
                // home directory.
                instructions.add(PathInstruction.HomeDirectory);
            }
            else {
                instructions.add(segment);
            }
        });
        return instructions;
    }
}