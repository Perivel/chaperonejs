import { ContainerInterface } from "../container/container.interface";
/**
 * BindingFactory
 *
 * BindingFactory type.
 */
export declare type BindingFactory<T> = (container: ContainerInterface) => T;
