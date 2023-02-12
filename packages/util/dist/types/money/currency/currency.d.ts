import { Equatable, Serializable } from './../../common';
import { CurrencyInterface } from './currency.interface';
/**
 * Currency
 *
 * A representation of currency.
 */
export declare class Currency implements CurrencyInterface, Equatable, Serializable {
    readonly symbol: string;
    readonly name: string;
    readonly decimalPlaces: number;
    constructor(symbol: string, name: string, decimalPlaces?: number);
    /**
     * USD()
     */
    static USD(): Currency;
    equals(suspect: any): boolean;
    serialize(): string;
    toString(): string;
}
