/// <reference types="node" />
/// <reference types="node" />
import { Equatable } from '@chaperone/util';
import { Serializable } from 'child_process';
import { ErrorHandlerFn, MessageHandlerFn, ProcessInterface } from './process.interface';
import { RunOptions } from './run-options.interface';
import { StartProcessOptions } from './start-process-options.interface';
/**
 * Process
 *
 * The process object
 */
export declare class Process implements ProcessInterface, Equatable {
    private readonly childProcess;
    private readonly _forked;
    private _isKilled;
    private _exitCode;
    private constructor();
    /**
     * Run()
     *
     * runs a command.
     * @param cmd the command to run
     * @param options command options.
     * @returns the output of the process.
     * @throws ProcessFailedException when the process exits with a non-zero exit code.
     */
    static Run(cmd: string, options?: RunOptions): Promise<string>;
    /**
     * Start()
     *
     * creates a new child process
     */
    static Start(cmd: string, options?: StartProcessOptions): Process;
    /**
     * addErrorHandler()
     *
     * adds an error handler to the process.
     * @param handler the error handler
     */
    addErrorHandler(handler: ErrorHandlerFn): void;
    /**
     * addMessageHandler()
     *
     * adds a message handler to the process.
     * @param handler the message handler to add.
     */
    addMessageHandler(handler: MessageHandlerFn): void;
    /**
     * canBeMessaged()
     *
     * determines if the process can be sent messages (i.e. if process.sendMessage() can be used on the instance.).
     */
    canBeMessaged(): boolean;
    equals(suspect: any): boolean;
    /**
     * exitCode()
     *
     * gets the process exit code.
     */
    exitCode(): number | null;
    /**
     * id()
     *
     * gets the ID of the process.
     */
    id(): number;
    /**
     * isActive()
     *
     * determines if the process is active.
     */
    isActive(): boolean;
    /**
     * isForked()
     *
     * determines if the process is forked.
     */
    isForked(): boolean;
    /**
     * kill()
     *
     * kills the process.
     * @param signal the signal to send.
     * @default 'SIGTERM'
     * @throws ProcessException when the operation fails.
     */
    kill(signal?: NodeJS.Signals): void;
    /**
     * sendMessage()
     *
     * sends a message to the child process.
     * @throws ProcessException when the message cannot be sent, like if there is no connection to the child/parent process.
     */
    sendMessage(message: Serializable): Promise<void>;
    toString(): string;
}
