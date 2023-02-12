import { Equatable } from './../common';
import { Currency } from './currency';
import { MoneyException } from './money.exception';
import { MoneyInterface } from './money.interface';

/**
 * Money
 * 
 * A class representing monetary values.
 */

export class Money implements MoneyInterface, Equatable {
    private _amountInCents: number;
    private _currency: Currency;

    constructor(amount: number, currency: Currency) {
        this._amountInCents = Math.round(amount * Math.pow(10, currency.decimalPlaces));
        this._currency = currency;
    }

    get amount(): number {
        return this.amountInCents / Math.pow(10, this.currency.decimalPlaces);
    }

    get amountInCents(): number {
        return this._amountInCents;
    }

    get currency(): Currency {
        return this._currency;
    }

    /**
     * add()
     * 
     * adds the specified amount of money.
     * @param money the money to add.
     * @returns the new money amount.
     */

    public add(money: Money): Money {
        if (this.currency.symbol !== money.currency.symbol) {
            throw new MoneyException(`Cannot add money with different currencies (${this.currency.symbol} and ${money.currency.symbol})`);
        }
        return new Money(this.amountInCents + money.amountInCents, this.currency);
    }

    /**
     * divide()
     * 
     * divides the money value by the factor.
     * @param divisor the divisor
     */

    public divide(divisor: number): Money {
        return new Money(this.amountInCents / divisor, this.currency);
    }

    public equals(suspect: any): boolean {
        let isEqual = false;

        if (suspect instanceof Money) {
            const other = suspect as Money;
            isEqual = this.currency.equals(other.currency) && (this.amountInCents === other.amountInCents);
        }

        return isEqual;
    }

    /**
     * multiply()
     * 
     * multiplies the money value by the factor.
     * @param factor the factor
     */

    public multiply(factor: number): Money {
        return new Money(this.amountInCents * factor, this.currency);
    }

    /**
     * subtract()
     * 
     * subtracts the specified amount of money.
     * @param money the money to subtract.
     * @returns the resulting amount of money.
     */

    public subtract(money: Money): Money {
        if (this.currency.symbol !== money.currency.symbol) {
            throw new MoneyException(`Cannot subtract money with different currencies (${this.currency.symbol} and ${money.currency.symbol})`);
        }
        return new Money(this.amountInCents - money.amountInCents, this.currency);
    }
}