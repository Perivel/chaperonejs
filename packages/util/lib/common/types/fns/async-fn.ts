/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * AsyncFn
 * 
 * An asynchronous function type.
 */

export type AsyncFn<T> = (...args: any) => Promise<T>;