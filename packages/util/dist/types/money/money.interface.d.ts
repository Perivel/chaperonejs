import { CurrencyInterface } from './currency';
/**
 * MoneyInterface
 *
 */
export interface MoneyInterface {
    readonly amount: number;
    readonly currency: CurrencyInterface;
    readonly amountInCents: number;
    /**
     * add()
     *
     * adds the specified amount of money.
     * @param money the money to add.
     * @returns the new money amount.
     */
    add(money: MoneyInterface): MoneyInterface;
    /**
     * subtract()
     *
     * subtracts the specified amount of money.
     * @param money the money to subtract.
     * @returns the resulting amount of money.
     */
    subtract(money: MoneyInterface): MoneyInterface;
    /**
     * multiply()
     *
     * multiplies the money value by the factor.
     * @param factor the factor
     */
    multiply(factor: number): MoneyInterface;
    /**
     * divide()
     *
     * divides the money value by the factor.
     * @param divisor the divisor
     */
    divide(divisor: number): MoneyInterface;
}
//# sourceMappingURL=money.interface.d.ts.map