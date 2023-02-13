import { Equatable, Serializable } from './../common';
import { Currency } from './currency';
import { MoneyException } from './money.exception';
import { MoneyInterface } from './money.interface';

/**
 * Money
 * 
 * A class representing monetary values.
 */

export class Money implements MoneyInterface, Equatable, Serializable {
    private _amountInCents: number;
    private _currency: Currency;

    constructor(amount: number, currency: Currency = Currency.USD()) {
        this._amountInCents = this._toInteger(amount, currency.decimalPlaces);
        this._currency = currency;
    }

    get amount(): number {
        return this._toDecimal(this.amountInCents, this.currency.decimalPlaces);
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
        const newAmount = this._toDecimal(this.amountInCents + money.amountInCents, this.currency.decimalPlaces);
        return new Money(newAmount, this.currency);
    }

    /**
     * divide()
     * 
     * divides the money value by the factor.
     * @param divisor the divisor
     */

    public divide(divisor: number): Money {
        if (divisor !== 0) {
            const newAmount = this._toDecimal(this.amountInCents / divisor, this.currency.decimalPlaces);
            return new Money(newAmount, this.currency);
        }
        else {
            throw new MoneyException('Cannot divide by zero.');
        }
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
        const newAmount = this._toDecimal(this.amountInCents * factor, this.currency.decimalPlaces);
        return new Money(newAmount, this.currency);
    }

    public serialize(): string {
        return JSON.stringify({
            amount: this.amount,
            amount_in_cents: this.amountInCents,
            currency: this.currency.serialize()
        });
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
        const newAmount = this._toDecimal(this.amountInCents - money.amountInCents, this.currency.decimalPlaces);
        return new Money(newAmount, this.currency);
    }

    /**
     * _toDecimal()
     * 
     * converts an integer value to a decimal value.
     * @param value the integer value to convert.
     * @param numPlaces the number of decimal places.
     * @returns the converted decimal value.
     */

    private _toDecimal(value: number, numPlaces: number = 2.0): number {
        return value / Math.pow(10, numPlaces);
    }

    /**
     * _toInteger()
     * 
     * converts a decimal value to an integer value.
     * @param value the decimal value to convert.
     * @param numPlaces the number of decimal places.
     * @returns the converted integer value.
     */

    private _toInteger(value: number, numPlaces: number = 2.0): number {
        return Math.round(value * Math.pow(10, numPlaces));
    }

    public toString(): string {
        return `${this.currency.symbol}${this.amount} ${this.currency.name}`;
    }
}
