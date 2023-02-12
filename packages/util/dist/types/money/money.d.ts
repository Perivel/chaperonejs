import { Equatable } from './../common';
import { Currency } from './currency';
import { MoneyInterface } from './money.interface';
/**
 * Money
 *
 * A class representing monetary values.
 */
export declare class Money implements MoneyInterface, Equatable {
    private _amountInCents;
    private _currency;
    constructor(amount: number, currency: Currency);
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
    /**
     * subtract()
     *
     * subtracts the specified amount of money.
     * @param money the money to subtract.
     * @returns the resulting amount of money.
     */
    subtract(money: Money): Money;
}
