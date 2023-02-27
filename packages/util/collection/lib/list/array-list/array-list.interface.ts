import { ListInterface } from './../list.interface';

export interface ArrayListInterface<T> extends ListInterface<T> {
    
    /**
     * indexOf()
     * 
     * gets the index of the first occurance of suspect.
     * @param suspect the suspect to check for.
     * @returns the index of the first occurance of the suspect or -1 if it does not exist.
     */

    indexOf(suspect: T): number;

    /**
     * lastIndexOf()
     * 
     * gets the index of the last occurance of suspect.
     * @param suspect the suspect to check for.
     * @returns the index of the last occurance of the suspect or -1 if it does not exist.
     */
    
    lastIndexOf(suspect: T): number;
}