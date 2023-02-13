import { Equatable, Serializable } from './../common';
import { Currency } from './currency';
import { MoneyInterface } from './money.interface';
/**
 * Money
 *
 * A class representing monetary values.
 */
export declare class Money implements MoneyInterface, Equatable, Serializable {
    private _amountInCents;
    private _currency;
    constructor(amount: number, currency?: Currency);
    get amount(): number;
    get amountInCents(): number;
    get currency(): Currency;
    /**
     * add()
     *
     * adds the specified amount of money.
     * @param money the money to add.
     * @returns the new money amount.
     */
    add(money: Money): Money;
    /**
     * divide()
     *
     * divides the money value by the factor.
     * @param divisor the divisor
     */
    divide(divisor: number): Money;
    equals(suspect: any): boolean;
    /**
     * multiply()
     *
     * multiplies the money value by the factor.
     * @param factor the factor
     */
    multiply(factor: number): Money;
    serialize(): string;
    /**
     * subtract()
     *
     * subtracts the specified amount of money.
     * @param money the money to subtract.
     * @returns the resulting amount of money.
     */
    subtract(money: Money): Money;
    /**
     * _toDecimal()
     *
     * converts an integer value to a decimal value.
     * @param value the integer value to convert.
     * @param numPlaces the number of decimal places.
     * @returns the converted decimal value.
     */
    private _toDecimal;
    /**
     * _toInteger()
     *
     * converts a decimal value to an integer value.
     * @param value the decimal value to convert.
     * @param numPlaces the number of decimal places.
     * @returns the converted integer value.
     */
    private _toInteger;
    toString(): string;
}
