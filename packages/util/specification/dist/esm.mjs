/**
 * OrSpecification
 */
class t{_left;_right;constructor(t,i){this._left=t,this._right=i}
/**
     * isSatisfiedBy()
     *
     * isSatisfiedBy() determines whether or
     * not suspect satisfies the specification.
     *
     * @param suspect the suspect to be tested.
     */isSatisfiedBy(t){return!(!this._left||!this._right)&&(this._left.isSatisfiedBy(t)||this._right.isSatisfiedBy(t))}
/**
     * and()
     * @param other the other specification
     */and(t){return new r(this,t)}
/**
     * andNot()
     * @param other the other specification.
     */andNot(t){return new s(this,t)}
/**
     * or()
     * @param other The other specification.
     */or(i){return new t(this,i)}
/**
     * orNot()
     * @param other the other specification.
     */orNot(t){return new i(this,t)}}
/**
 * OrNotSpecification
 */class i{_left;_right;constructor(t,i){this._left=t,this._right=i}
/**
     * isSatisfiedBy()
     *
     * isSatisfiedBy() determines whether or
     * not suspect satisfies the specification.
     *
     * @param suspect the suspect to be tested.
     */isSatisfiedBy(t){return!(!this._left||!this._right)&&(this._left.isSatisfiedBy(t)||!this._right.isSatisfiedBy(t))}
/**
     * and()
     * @param other the other specification
     */and(t){return new r(this,t)}
/**
     * andNot()
     * @param other the other specification.
     */andNot(t){return new s(this,t)}
/**
     * or()
     * @param other The other specification.
     */or(i){return new t(this,i)}
/**
     * orNot()
     * @param other the other specification.
     */orNot(t){return new i(this,t)}}
/**
 * AndSpecification
 */class r{_left;_right;constructor(t,i){this._left=t,this._right=i}
/**
     * isSatisfiedBy()
     *
     * isSatisfiedBy() determines whether or
     * not suspect satisfies the specification.
     *
     * @param suspect the suspect to be tested.
     */isSatisfiedBy(t){return!(!this._left||!this._right)&&(this._left.isSatisfiedBy(t)&&this._right.isSatisfiedBy(t))}
/**
     * and()
     * @param other the other specification
     */and(t){return new r(this,t)}
/**
     * andNot()
     * @param other the other specification.
     */andNot(t){return new s(this,t)}
/**
     * or()
     * @param other The other specification.
     */or(i){return new t(this,i)}
/**
     * orNot()
     * @param other the other specification.
     */orNot(t){return new i(this,t)}}
/**
 * AndNotSpecification
 */class s{_left;_right;constructor(t,i){this._left=t,this._right=i}
/**
     * isSatisfiedBy()
     *
     * isSatisfiedBy() determines whether or
     * not suspect satisfies the specification.
     *
     * @param suspect the suspect to be tested.
     */isSatisfiedBy(t){return!(!this._left||!this._right)&&(this._left.isSatisfiedBy(t)&&!this._right.isSatisfiedBy(t))}
/**
     * and()
     * @param other the other specification
     */and(t){return new r(this,t)}
/**
     * andNot()
     * @param other the other specification.
     */andNot(t){return new s(this,t)}
/**
     * or()
     * @param other The other specification.
     */or(i){return new t(this,i)}
/**
     * orNot()
     * @param other the other specification.
     */orNot(t){return new i(this,t)}}
/**
 * Specification
 *
 * Specification is the base specification.
 */class e{constructor(){}
/**
     * and()
     * @param other the other specification
     */and(t){return new r(this,t)}
/**
     * andNot()
     * @param other the other specification.
     */andNot(t){return new s(this,t)}
/**
     * or()
     * @param other The other specification.
     */or(i){return new t(this,i)}
/**
     * orNot()
     * @param other the other specification.
     */orNot(t){return new i(this,t)}}export{s as AndNotSpecification,e as CompositeSpecification,i as OrNotSpecification,t as OrSpecification};
