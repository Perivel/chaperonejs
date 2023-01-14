import { ContainerException } from "./container.exception";
/**
 * DependencyNotFoundException
 *
 * DependencyNotFoundException indicates that a dependency was not found.
 */
export declare class DependencyNotFoundException extends ContainerException {
    constructor(message?: string);
}
