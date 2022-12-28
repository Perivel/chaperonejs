import { ComparisonResult } from './../types';
/**
 * Comparable
 * 
 * An interface to enable comparison.
 */

export interface Comparable<T> {

    /**
     * compareTo()
     * 
     * performs a comparison between the instance and the suspect.
     * @param suspect the suspect to compare.
     * @returns a Comparison Result indicating the relationship between the instance and the suspect.
     */

    compareTo(suspect: T): ComparisonResult;
}