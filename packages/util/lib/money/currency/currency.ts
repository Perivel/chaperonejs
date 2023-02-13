import { Equatable, Serializable } from './../../common';
import { CurrencyInterface } from './currency.interface';

/**
 * Currency
 * 
 * A representation of currency.
 */

export class Currency implements CurrencyInterface, Equatable, Serializable {

    readonly symbol: string;
    readonly name: string;
    readonly decimalPlaces: number;
    readonly abreviation: string;

    constructor(symbol: string, name: string, abreviation: string, decimalPlaces: number = 2.0) {
        this.symbol = symbol;
        this.name = name;
        this.decimalPlaces = decimalPlaces;
        this.abreviation = abreviation;
    }

    /**
     * USD()
     */

    public static USD(): Currency {
        return new Currency(
            '$',
            'United States Dollar',
            'USD',
            2.0
        );
    }

    public equals(suspect: any): boolean {
        let isEqual = false;

        if (suspect instanceof Currency) {
            const other = suspect as Currency;
            isEqual = (
                (this.decimalPlaces === other.decimalPlaces) &&
                (this.symbol === other.symbol) &&
                (this.name === other.name) &&
                (this.abreviation === other.abreviation)
            );
        }

        return isEqual;
    }

    public serialize(): string {
        return JSON.stringify({
            symbol: this.symbol,
            name: this.name,
            abreviation: this.abreviation,
            decimal_places: this.decimalPlaces
        });
    }

    public toString(): string {
        return this.name;
    }
}