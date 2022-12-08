import{isHex as a,rgbaToHex as l,hexToRgba as n}from"colors-convert";import*as h from"bcryptjs";import{IANAZone as e,DateTime as i,Duration as s}from"luxon";import*as t from"i18n-iso-countries";import{camelCase as r,capitalCase as u,constantCase as p,dotCase as o,headerCase as c,noCase as g,paramCase as b,pascalCase as F,pathCase as E,snakeCase as m}from"change-case";import{validate as d,NIL as k,v1 as w,v3 as f,v4 as y,v5 as v,version as S}from"uuid";import{parsePhoneNumber as z}from"awesome-phonenumber";import _ from"sanitize-html";
/**
 * CharacterSet
 *
 * A CharacterSet.
 */class q{constructor(a){this._value=a}
/**
     * ASCII()
     *
     * Creates a CharacterSet instance set to ASCII.
     * @returns A CharacterSet instance set to ASCII.
     */static ASCII(){return new q("ASCII")}
/**
     * UTF8()
     *
     * Creates a CharacterSet instance set to UTF8.
     * @returns A CharacterSet set to UTF-8.
     */static UTF8(){return new q("UTF-8")}
/**
     * equals()
     *
     * determines if the instance and the suspect are equal.
     * @param suspect the suspect to compare.
     * @returns TRUE if the instance and the suspect are equal. FALSE otherwise.
     */equals(a){let l=!1;if(a instanceof q){const n=a;l=this.value()===n.value()}return l}
/**
     * value()
     *
     * gets the value of the Character Set.
     */value(){return this._value}toString(){return this.value()}}
/**
 * BaseException
 *
 * DomainException represents a generic domain exception.
 */class C extends Error{constructor(a="A domain error occured."){super(a)}}
/**
 * InvlaidArguentException
 *
 * InvalidArgumentException indicates an argument is invalid.
 */class x extends C{constructor(a="Invalid Argument"){super(a)}}
/**
 * MethodUndefinedException
 *
 * MethodUndefinedException is an error indicating that a method
 * that was called is undefined.
 */class A extends C{constructor(a="Method undefined."){super(a)}}class D extends x{constructor(a="Argument out of bounds."){super(a)}}
/**
 * NetworkException
 *
 * NetworkException indicates a network exception has occured.
 */class j extends C{constructor(a="Network Error"){super(a)}}
/**
 * ColorException
 *
 * A generic color error.
 */class N extends C{constructor(a="Color Error"){super(a)}}
/**
 * HexException
 *
 * A Hex value error.
 */class T extends N{constructor(a="Hex Error"){super(a)}}
/**
 * Hex
 *
 * A Hex color value.
 */class M{
/**
     * Creates a Hex instance.
     * @param value the hex value.
     * @throws HexException when the hex value is invalid.
     */
constructor(l){if(l=l.toUpperCase(),!a(l))throw new T;this._value=l}equals(a){let l=!1;if(a instanceof M){const n=a;l=this.value()===n.value()}return l}serialize(){return this.value()}toString(){return this.serialize()}
/**
     * value()
     *
     * gets the value.
     */value(){return this._value}}
/**
 * RGBAException
 *
 * An RGBA value error.
 */class B extends N{constructor(a="RGBA Error"){super(a)}}
/**
 * RGBA
 *
 * An RGBA color representation.
 */class I{
/**
     * Creates an RGBA value.
     * @param r the r value.
     * @param g the g value.
     * @param b the b value.
     * @param a the alpha value.
     * @trows RGBAException when the RGBA values are invalid.
     */
constructor(a,l,n,h=1){if(a=Math.floor(a),l=Math.floor(l),n=Math.floor(n),!(a>=0&&a<=255&&l>=0&&l<=255&&n>=0&&n<=255&&h>=0&&h<=1))
// invalid.
throw new B;
// valid RGBA.
this._a=h,this._b=n,this._g=l,this._r=a}
/**
     * a()
     *
     * gets the alpha value.
     */a(){return this._a}
/**
     * b()
     *
     * gets the blue value.
     */b(){return this._b}equals(a){let l=!1;if(a instanceof I){const n=a;l=this.r()===n.r()&&this.g()===n.g()&&this.b()===n.b()&&this.a()===n.a()}return l}
/**
     * g()
     *
     * gets the green value.
     */g(){return this._g}
/**
     * r()
     *
     * gets the red value.
     */r(){return this._r}serialize(){return JSON.stringify({r:this.r().toString(),g:this.g().toString(),b:this.b().toString(),a:this.a().toString()})}
/**
     * setA()
     *
     * sets the alpha value.
     * @param x the value to set.
     * @throws RGBAException when x is invalid.
     */setA(a){return new I(this.r(),this.g(),this.b(),a)}
/**
     * setB()
     *
     * sets the b value.
     * @param x the value to set.
     * @throws RGBAException when x is invalid.
     */setB(a){return new I(this.r(),this.g(),a,this.a())}
/**
     * setG()
     *
     * sets the g value.
     * @param x the value to set.
     * @throws RGBAException when x is invalid.
     */setG(a){return new I(this.r(),a,this.b(),this.a())}
/**
     * setR()
     *
     * sets the r value.
     * @param x the value to set.
     * @throws RGBAException when x is invalid.
     */setR(a){return new I(a,this.g(),this.b(),this.a())}toString(){return this.serialize()}}
/**
 * Color
 *
 * A Color value.
 */class L{
/**
     * Creates a Color value.
     * @param value the value of the color.
     */
constructor(a){if(a instanceof I)this._rgba=a,this._hex=new M(l({r:this._rgba.r(),g:this._rgba.g(),b:this._rgba.b(),a:this._rgba.a()}));else{this._hex=a;const l=n(this._hex.value());this._rgba=new I(l.r,l.g,l.b,l.a)}}
/**
     * Black()
     *
     * creates a Black color.
     * @param a the alpha value, defaults to 1.0
     * @returns a color instance representing the Black color.
     */static Black(a=1){return L.FromRGBA(0,0,0,a)}
/**
     * Blue()
     *
     * creates a Color instance set to blue.
     * @param a the alpha value, defaults to 1.0
     * @returns a color value set to blue.
     */static Blue(a=1){return L.FromRGBA(0,0,255,a)}
/**
     * FromHex()
     *
     * creates a Color instance from a Hex string.
     * @param v the hex value.
     * @returns a Color representing the Hex value provided.
     * @throws HexException when the Hex value is invalid.
     */static FromHex(a){const l=new M(a);return new L(l)}
/**
     * FromRGBA()
     *
     * Creates a Color instance using the RGBA values provided.
     * @param r the r value.
     * @param g the g value.
     * @param b the b value.
     * @param a the a value.
     * @returns a Color instance set to the RGBA value provided.
     */static FromRGBA(a,l,n,h=1){const e=new I(a,l,n,h);return new L(e)}
/**
     * Green()
     *
     * creates a Color instance set to green.
     * @param a the alpha value, defaults to 1.0
     * @returns a color value set to green.
     */static Green(a=1){return L.FromRGBA(0,255,0,a)}
/**
     * Red()
     *
     * creates a Color instance set to red.
     * @param a the alpha value, defaults to 1.0
     * @returns a color value set to red.
     */static Red(a=1){return L.FromRGBA(255,0,0,a)}
/**
     * White()
     *
     * creates a Color instance set to white.
     * @param a the alpha value, defaults to 1.0
     * @returns a color value set to White.
     */static White(a=1){return L.FromRGBA(255,255,255,a)}equals(a){let l=!1;if(a instanceof L){const n=a;l=this.rgba().equals(n.rgba())&&this.hex().equals(n.hex())}return l}
/**
     * hex()
     *
     * gets the hex value of the color.
     */hex(){return this._hex}
/**
     * rgba()
     *
     * gets the RGBA value of the color.
     */rgba(){return this._rgba}serialize(){return JSON.stringify({hex:this.hex().serialize(),rgba:this.rgba().serialize()})}toString(){return this.serialize()}}
/**
 * Salt
 *
 * Represents a salt.
 */class K{constructor(a){this._value=a}
/**
     * Generate()
     *
     * generates a salt.
     * @param rounds the number of rounds to use.
     * @returns a generated hash
     */static async Generate(a=10){return new K(await h.genSalt(a))}
/**
     * equals()
     *
     * compares the suspect to the instance to determine if they are equal.
     * @param suspect the suspect to compare
     * @returns true if the suspect and the instance are equal
     */equals(a){let l=!1;return a instanceof K&&(l=a.value()===this.value()),l}
/**
     * value()
     *
     * gets the value of the salt.
     */value(){return this._value}toString(){return this.value()}}
/**
 * Hash
 *
 * A Hash.
 */class P{constructor(a){this._value=a}
/**
     * Create()
     *
     * creates a hash using the data and the salt
     * @param data the data to hash
     * @param salt the salt to use
     * @returns a hashed version of the data
     */static async Create(a,l){
//return new Hash(await Bcrypt.hash(data, salt.value()));
return new Promise(((n,e)=>{h.hash(a.toString(),l.value(),((a,l)=>{a?e(a):n(new P(l))}))}))}
/**
     * equals()
     *
     * compares the instance to the suspect, to determine if they are equal.
     * @param suspect the suspect to compare
     */equals(a){let l=!1;return a instanceof P&&(l=this.value()===a.value()),l}toString(){return this.value()}
/**
     * value()
     *
     * gets the value of the hash.
     */value(){return this._value}}class O extends C{constructor(a="Country Error"){super(a)}}class G extends x{constructor(a="Street Address Error"){super(a)}}class Z extends G{constructor(a="Invalid Locality"){super(a)}}class U extends G{constructor(a="Invalid Postal Code"){super(a)}}class R extends G{constructor(a="Invalid Region"){super(a)}}class H extends G{constructor(a="Invalid Street"){super(a)}}
/**
 * TimezoneException
 *
 * TimezoneException represents a generic timezone error.
 */class J extends C{constructor(a="Timezone error."){super(a)}}
/**
 * Timezone
 *
 * Timezone represents a Timezone
 */class V{constructor(a,l,n){this._id=a,this._abbreviation=l,this._offset=n}
/**
     * FromId()
     *
     * FromeId() creates a Timezone from an Id.
     * @param id The Id of the timezone.
     */static FromId(a){if(!e.isValidZone(a))
// invalid timezone.
throw new J;
// timezone exists.
const l=e.create(a),n=i.fromJSDate(new Date).setZone(l);return new V(l.name,n.toFormat("ZZZZ"),n.offset)}
/**
     * Local()
     *
     * Creates a Timezone instance representing the local timezone (based on the machine)
     * @returns A Timezone instance representing local time.
     */static Local(){const a=i.local();return new V(a.zone.name,a.toFormat("ZZZZ"),a.offset)}
/**
     * UTC()
     *
     * UTC() sets the timezone to UTC.
     */static UTC(){const a=i.fromJSDate(new Date).setZone("utc");return new V(a.zone.name,a.toFormat("ZZZZ"),a.offset)}
/**
     * abbreviation()
     *
     * abbreviation() gets the timezone abbreviation()
     */abbreviation(){return this._abbreviation}
/**
     * equals()
     *
     * equals() compares the instnace to the suspect to determine if they are equal.
     * @param suspect the suspect to be compared.
     */equals(a){let l=!1;if(a instanceof V){const n=a;l=this.id()===n.id()&&this.abbreviation()===n.abbreviation()&&this.utcOffset()===n.utcOffset()}return l}
/**
     * id()
     *
     * id() gets the Olson timezone id.
     */id(){return this._id}
/**
     * utcOffset()
     *
     * utcOffset() gets the UTC offset of the timezone.
     */utcOffset(){return this._offset}toString(){return this.id()}}
/**
 * Coordinates
 *
 * Coordinates represents a geographic longitude/latitude pair.
 */class W{constructor(a,l){this._long=a,this._lat=l}
/**
     * equals()
     *
     * equals() compares the suspect to the instance, to determine if they are equals.
     * @param suspect The suspect to compare.
     */equals(a){let l=!1;if(a instanceof W){const n=a;l=this.longitude()===n.longitude()&&this.latitude()===n.latitude()}return l}
/**
     * latitude()
     *
     * latitude() gets the latitude.
     */latitude(){return this._lat}
/**
     * longitude()
     *
     * longitude() gets teh longitude.
     */longitude(){return this._long}toString(){return`${this.latitude()}, ${this.longitude()}`}}
/**
 * Country
 *
 * Country represents a Country in the world.
 */class Y{
/**
     * Creates a Country instance
     * @param code The country code.
     * @throws CountryException when the country information is invalid.
     */
constructor(a){const l=a.toUpperCase(),n=t.getName(l,"en");if(!n)
// invalid country
throw new O;this._code=l,this._name=n}
/**
     * code()
     *
     * code() gets the country code.
     */code(){return this._code}
/**
     * name()
     *
     * name() gets the country's common name.
     */name(){return this._name}
/**
     * equals()
     *
     * equals() compares the Country to the suspect to determine if they are equal.
     * @param suspect The suspect to be compared.
     */equals(a){let l=!1;if(a instanceof Y){const n=a;l=this.code()===n.code()}return l}toString(){return this.name()}}
/**
 * Street
 *
 * Street represents an address street.
 */class ${
/**
     * Creates a Street Instance.
     * @param line1 String
     * @param line2 Strirg
     * @throws StreetException when the street in invalid.
     */
constructor(a,l=""){if(!a){throw new H}this._line1=a,this._line2=l}
/**
     * Determines if two streets are equal.
     * @param suspect The value being compared.
     */equals(a){let l=!1;if(a instanceof $){const n=a;l=this.line1()===n.line1()&&this.line2()==this.line2()}return l}
/**
     * line1()
     *
     * line1() gets the line1 value of the street address.
     */line1(){return this._line1}
/**
     * line2()
     *
     * line2() gets the line2 value of the street.
     */line2(){return this._line2}serialize(){return JSON.stringify({line_1:this.line1(),line2:this.line2()})}toString(){return this.serialize()}}
/**
 * Locality
 *
 * Locality represents an Address Locality, or a City or Town.
 */class Q{
/**
     * Creates a Locality instance.
     * @param name The name of the locality.
     * @throws LocalityException when the locality is invalid.
     */
constructor(a){if(!a){throw new Z}this._name=a}
/**
     * Compares the instance to the suspect to determine if they are equal.
     * @param suspect The suspect to compare.
     */equals(a){let l=!1;if(a instanceof Q){const n=a;l=this.name()===n.name()}return l}
/**
     * name()
     *
     * name() gets the locality name.
     */name(){return this._name}serialize(){return this.name()}toString(){return this.serialize()}}
/**
 * Region
 *
 * Region represents an Address Region (a state or province).
 */class X{
/**
     * Creates a Region instnace
     * @param name The nsme of the region
     * @throws RegionException when the region is invalid.
     */
constructor(a){if(!a){throw new R}this._name=a}
/**
     * equals()
     *
     * equals() compares the suspect and the instance to determine if they are equal.
     * @param suspect the suspect to be compared.
     */equals(a){let l=!1;if(a instanceof X){const n=a;l=this.name()===n.name()}return l}
/**
     * name()
     *
     * name() gets the name of the region.
     */name(){return this._name}serialize(){return this.name()}toString(){return this.serialize()}}
/**
 * PostalCode
 *
 * PostalCode represents an address Postal Code (or Zip Code)
 */class aa{
/**
     * Creates a Postal Code instance.
     * @param value string
     * @throws InvalidPostalCodeException when the postal code is invalid.
     */
constructor(a){if(!a){throw new U}this._value=a}
/**
     * equals()
     *
     * equals() compares the PostalCode object to the suspect to determine if they are equal.
     * @param suspect The value being compared.
     */equals(a){let l=!1;if(a instanceof aa){const n=a;l=this.value()===n.value()}return l}serialize(){return this.value()}toString(){return this.serialize()}
/**
     * value()
     *
     * value() gets the postal code value.
     */value(){return this._value}}
/**
 * StreetAddress
 *
 * StreetAddress represents a a physical street address.
 */class la{
/**
     * Creates a new StreetAddress Instance.
     * @param street Street
     * @param locality Locality
     * @param region Region
     * @param postal_code PostalCode
     * @param country Country
     *
     * @throws StreetException when the street is invalid.
     * @throws LocalityException when the locality is invalid.
     * @throws RegionException when the the region is invalid.
     * @throws PostalCodeException when the postal code is invalid.
     * @throws CountryException when the country is invalid.
     *
     */
constructor(a,l,n,h,e){let i=null;if(!a)throw i=new H,i;if(!l)throw i=new Z,i;if(!n)throw i=new R,i;if(!h)throw i=new U,i;if(!e)throw i=new O,i;this._street=a,this._locality=l,this._region=n,this._postal=h,this._country=e}
/**
     * FromPrimitives()
     *
     * creates a street address based on primitive values.
     * @param street_line_1 the street address line 1 value
     * @param street_line_2 street address line 2 value (optional)
     * @param locality_name the city or town name
     * @param region_name the state or province name
     * @param postal_code the zip code or postal code.
     * @param country_code the country code.
     * @returns a StreetAddress instance.
     *
     * @throws StreetException when the street is invalid.
     * @throws LocalityException when the
     */static FromPrimitives(a,l="",n,h,e,i){const s=new $(a,l),t=new Q(n),r=new X(h),u=new aa(e),p=new Y(i);return new la(s,t,r,u,p)}
/**
     * country()
     *
     * country() gets the address country.
     */country(){return this._country}
/**
     * equals()
     *
     * equals() compares the StreetAddress instance to the suspect to determine if they are equal.
     * @param suspect the suspect being compared.
     */equals(a){let l=!1;if(a instanceof la){const n=a;l=this.street().equals(n.street())&&this.locality().equals(n.locality())&&this.region().equals(n.region())&&this.postalCode().equals(n.postalCode())&&this.country().equals(n.country())}return l}
/**
     * locality()
     *
     * locality() gets the address locality.
     */locality(){return this._locality}
/**
     * postalCode()
     *
     * postalCode() gets the address postal code.
     */postalCode(){return this._postal}
/**
    * region()
    *
    * region() gets the address region.
    */region(){return this._region}serialize(){return JSON.stringify({street:this.street().serialize(),locality:this.locality().serialize(),region:this.region().serialize(),postal_code:this.postalCode().serialize(),country:this.country().toString()})}
/**
     * street()
     *
     * street() gets the address street.
     */street(){return this._street}toString(){return this.serialize()}}
/**
 * DateException
 *
 * DateException represents a generic date error.
 */class na extends C{constructor(a="Date error."){super(a)}}
/**
 * DurationException
 *
 * DurationException represents a generic duration error.
 */class ha extends C{constructor(a="Duration error."){super(a)}}
/**
 * DateTime
 *
 * DateTime represents a specific date and time.
 */class ea{
/**
     * Creates a DateTime object.
     * @param value Date
     */
constructor(a,l,n,h=0,e=0,s=0,t=0,r=V.UTC()){if(this.date=i.fromObject({year:a,month:l,day:n,hour:h,minute:e,second:s,millisecond:t},{zone:"utc"}),!this.date.isValid)throw new na;this.tz=r}
/**
     * FromDate()
     *
     * creates a Timestamp instance from a Date object.
     * @param dateVal The date to create a timestamp from
     * @throws DateException when the date is invalid.
     */static FromDate(a,l){const n=i.fromJSDate(a).toUTC();return new ea(n.year,n.month,n.day,n.hour,n.minute,n.second,n.millisecond,l)}
/**
     * FromIsoString()
     *
     * Creates a DateTime object from an ISO string.
     * @param str the timezone to parse.
     * @param timezone the timezone.
     * @returns the generated DateTime object.
     */static FromIsoString(a,l){const n=i.fromISO(a);return new ea(n.year,n.month,n.day,n.hour,n.minute,n.second,n.millisecond,l)}
/**
     * Local()
     *
     * creates a DateTime instance where the timezone is set to the local timezone.
     * @returns A DateTime object where the timezone is set to the local timezone.
     */static Local(){return ea.FromDate(i.local().toJSDate(),V.Local())}
/**
     * Now()
     *
     * Creates a DateTime for the current UTC date and time.
     */static Now(a=V.UTC()){return ea.FromDate(i.utc().toJSDate(),a)}
/**
     * add()
     *
     * add() adds the duration to the datetime.
     * @param duration the duration to add.
     */add(a){return ea.FromDate(this.date.plus(s.fromObject({years:a.years(),quarters:a.quarters(),months:a.months(),weeks:a.weeks(),days:a.days(),hours:a.hours(),minutes:a.minutes(),seconds:a.seconds(),milliseconds:a.miliseconds()})).toJSDate(),this.timezone())}
/**
     * day()
     *
     * day() gets the day of the month of the DateTime.
     * @returns a number between 1 and 31
     */day(){return this.date.day}
/**
     * hour()
     *
     * gets the hour.
     * @note hours are zero-based (0-23)
     */hour(){return this.date.hour}
/**
     * isAfter()
     *
     * isAfter() compares the Created instance to the suspect, to determine if the suspect is after the instance.
     * @param suspect The suspect to be compared.
     */isAfter(a){let l=!1;if(a instanceof ea){const n=a;l=this.date>n.date}return l}
/**
     * isBefore()
     *
     * isBefore() compares the instance to the suspect, to determine if the instance is before the suspect.
     * @param suspect The suspect to be compared to.
     */isBefore(a){let l=!1;if(a instanceof ea){const n=a;l=this.date<n.date}return l}
/**
     * equals()
     *
     * equals() compares the Created instance to a suspect, to determine if they are equal.
     * @param suspect The Created object to be compared.
     */equals(a){let l=!1;if(a instanceof ea){const n=a;l=this.date.equals(n.date)}return l}
/**
     * milisecond()
     *
     * gets the milisecond (0-999)
     */milisecond(){return this.date.millisecond}
/**
     * minute()
     *
     * gets the minute.
     * @note minutes are zero-based (0-59)
     */minute(){return this.date.minute}
/**
     * month()
     *
     * month() gets the month part of the DateTime.
     * @returns A numeric value (Jan = 1, Dec = 12) representing the month of the year.
     */month(){return this.date.month}
/**
     * second()
     *
     * gets the second
     * @note seconds are zero-based (0-59)
     */second(){return this.date.second}
/**
     * subtract()
     *
     * subtract() subtracts a duration form the date time.
     * @param duration the duratin to subtract.
     */subtract(a){return ea.FromDate(this.date.minus(s.fromObject({years:a.years(),quarters:a.quarters(),months:a.months(),weeks:a.weeks(),days:a.days(),hours:a.hours(),minutes:a.minutes(),seconds:a.seconds(),milliseconds:a.miliseconds()})).toJSDate(),this.timezone())}
/**
     * timezone()
     *
     * timezone() gets the timestamp timezone.
     */timezone(){return this.tz}toString(){return this.isoString()}
/**
     * toUtc()
     *
     * toUtc() converts the timestamp to UTC time.
     */toUtc(){return ea.FromDate(this.value(),V.UTC())}
/**
     * toTimeaone()
     *
     * toTimezone() converts the timestamp to the specified timezone.
     * @param timezone The timezone to convert to.
     */toTimezone(a){return ea.FromDate(this.value(),a)}
/**
     * isoString()
     *
     * isoString() gets a UTC string for a DateTime.
     */isoString(){return this.date.setZone(this.timezone().id()).toISO()}
/**
     * value()
     *
     * value() gets the value of the DateTime
     */value(){return this.date.setZone(this.timezone().id()).toJSDate()}
/**
     * year()
     *
     * year() gets the year portion of the DateTime.
     *
     * @returns number
     */year(){return this.date.year}}
/**
 * Duration
 *
 * Duration represents a duration. A duration is a period in time, such as "1 day", "2 weeks", or "5 months".
 */class ia{
/**
     * creates a Duration object.
     * @param an object specifying information about the Duration.
     * @throws DurationException when the Duration is invalid.
     */
constructor({years:a=0,quarters:l=0,months:n=0,weeks:h=0,days:e=0,hours:i=0,minutes:t=0,seconds:r=0,miliseconds:u=0}){if(this.luxonDuration=s.fromObject({years:a,quarters:l,months:n,weeks:h,days:e,hours:i,minutes:t,seconds:r,milliseconds:u},{conversionAccuracy:"longterm"}),!this.luxonDuration.isValid)
// not valid.
throw new ha(this.luxonDuration.invalidReason)}
/**
     * FromDateTimeDifference()
     *
     * Creates a duration given the difference between the DateTime instances.
     * @param a the first date time
     * @param b the second date time
     * @returns a duration containing the difference between DateTimes a and b.
     */static FromDateTimeDifference(a,l){const n=i.fromISO(a.toString()),h=i.fromISO(l.toString()),e=a.isAfter(l)?n.diff(h):h.diff(n);return new ia({years:e.years,quarters:e.quarters,months:e.months,weeks:e.weeks,days:e.days,hours:e.hours,minutes:e.minutes,seconds:e.seconds,miliseconds:e.milliseconds})}
/**
     * days()
     *
     * gets the number of days in the duration.
     */days(){return this.luxonDuration.days}
/**
     * equals()
     *
     * equals() compares the instance to the suspect, to determine if they are equal.
     * @param suspect the suspect to compare.
     */equals(a){let l=!1;if(a instanceof ia){const n=a;l=this.luxonDuration.equals(n.luxonDuration)}return l}
/**
     * hours()
     *
     * hours() gets the number of hours in the duration.
     */hours(){return this.luxonDuration.hours}
/**
     * inDays()
     *
     * inDays() converts the duration to days.
     */inDays(){return this.luxonDuration.as("days")}
/**
     * inHours()
     *
     * inHours() converts the duration to hours.
     */inHours(){return this.luxonDuration.as("hours")}
/**
     * inMiliseconds()
     *
     * converts the duration to miliseconds.
     */inMiliseconds(){return this.luxonDuration.toMillis()}
/**
     * inMinutes()
     *
     * inMinutes() converts the duration to minutes.
     */inMinutes(){return this.luxonDuration.as("minutes")}
/**
     * inMonths()
     *
     * inMonths() converts the duration to months.
     */inMonths(){return this.luxonDuration.as("months")}
/**
     * inQuarters()
     *
     * inQuarters() converts the duration to quarters.
     */inQuarters(){return this.luxonDuration.as("quarters")}
/**
     * inSeconds()
     *
     * inSeconds() converts a duration to a second.
     */inSeconds(){return this.luxonDuration.as("seconds")}
/**
     * inWeeks()
     *
     * inWeeks() converts the duration to weeks.
     */inWeeks(){return this.luxonDuration.as("weeks")}
/**
     * inYears()
     *
     * inYears() converts the duration to years.
     */inYears(){return this.luxonDuration.as("years")}
/**
     * miliseconds()
     *
     * miliseconds() gets the miliseconds of the duration.
     */miliseconds(){return this.luxonDuration.milliseconds}
/**
     * minutes()
     *
     * minutes() gets the minutes of the duration.
     */minutes(){return this.luxonDuration.minutes}
/**
     * months()
     *
     * months() gets the months of the duration.
     */months(){return this.luxonDuration.months}
/**
     * quarters()
     *
     * quarters() gets the quarters in the duration.
     */quarters(){return this.luxonDuration.quarters}
/**
     * seconds()
     *
     * seconds() gets the seconds of the duration.
     */seconds(){return this.luxonDuration.seconds}
/**
     * weeks()
     *
     * weeks() gets the weeks.
     */weeks(){return this.luxonDuration.weeks}
/**
     * years()
     *
     * years() gets the years in the duration.
     */years(){return this.luxonDuration.years}
// ==========================
// Overrides
// ==========================
toString(){return this.luxonDuration.toISO()}}class sa extends x{constructor(a="Invalid Email Address"){super(a)}}
/**
 * EmailAddress
 *
 * EmailAddress provides functionality for handling email addresses.
 */class ta{
/**
     * Creates an instance of an email address.
     * @param value The value of the email address.
     * @throws EmailAddressException when the email address value is invalid.
     */
constructor(a){if(!new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?)*$").test(a))
// email is invalid.
throw new sa;{this._value=a;const l=a.indexOf("@");this._username=a.substring(0,l),this._domain=a.substring(l+1)}}
/**
     * domainName()
     *
     * domainName() gets the domain of the email address.
     */domainName(){return this._domain}
/**
     * email()
     *
     * email() gets the value of the email address.
     */email(){return this._value}
/**
     * equals()
     *
     * equals() compares the instance to the suspect, to determine if they are equal.
     * @param suspect The suspect to be compared.
     */equals(a){let l=!1;if(a instanceof ta){const n=a;l=this.email()===n.email()}return l}
/**
     * username()
     *
     * username() gets the username of the email address.
     */username(){return this._username}toString(){return this.email()}}
/**
 * The BaseFormatter class
 *
 * The base formatter class is the base class for Formatter classes.
 */class ra{constructor(){}}
/**
 * StringFormatter
 *
 * A utility class to format strings.
 */class ua extends ra{constructor(){super()}
/**
     * camelCase()
     *
     * converts an input into camel case.
     *
     * if the input is not a string type, camelCase() will attempt to convert it to a string.
     * @param input the input.
     * @returns The input in camel case format.
     */camelCase(a){return r(this.castToString(a),{})}
/**
     * capitalCase()
     *
     * converts an input into capital case.
     *
     * if the input is not a string type, capitalCase() will attempt to convert it to a string.
     * @param input the input.
     * @returns The input in capital case format.
     */capitalCase(a){return u(this.castToString(a))}
/**
     * constantCase()
     *
     * converts an input into constant case.
     *
     * if the input is not a string type, constantCase() will attempt to convert it to a string.
     * @param input the input.
     * @returns The input in camel constant format.
     */constantCase(a){return p(this.castToString(a))}
/**
     * dotCase()
     *
     * converts an input into dot case.
     *
     * if the input is not a string type, dotCase() will attempt to convert it to a string.
     * @param input the input.
     * @returns The input in dot case format.
     */dotCase(a){return o(this.castToString(a))}
/**
     * headerCase()
     *
     * converts an input into header case.
     *
     * if the input is not a string type, headerCase() will attempt to convert it to a string.
     * @param input the input.
     * @returns The input in header case format.
     */headerCase(a){return c(this.castToString(a))}
/**
     * noCase()
     *
     * converts an input into no case.
     *
     * if the input is not a string type, noCase() will attempt to convert it to a string.
     * @param input the input.
     * @returns The input in no case format.
     */noCase(a){return g(this.castToString(a))}
/**
     * paramCase()
     *
     * converts an input into param case.
     *
     * if the input is not a string type, paramCase() will attempt to convert it to a string.
     * @param input the input.
     * @returns The input in param case format.
     */paramCase(a){return b(this.castToString(a))}
/**
     * pascalCase()
     *
     * converts an input into pascal case.
     *
     * if the input is not a string type, pascalCase() will attempt to convert it to a string.
     * @param input the input.
     * @returns The input in pascal case format.
     */pascalCase(a){return F(this.castToString(a))}
/**
     * pathCase()
     *
     * converts an input into path case.
     *
     * if the input is not a string type, pathCase() will attempt to convert it to a string.
     * @param input the input.
     * @returns The input in path case format.
     */pathCase(a){return E(this.castToString(a))}
/**
     * snakeCase()
     *
     * converts an input into snake case.
     *
     * if the input is not a string type, snakeCase() will attempt to convert it to a string.
     * @param input the input.
     * @returns The input in snake case format.
     */snakeCase(a){return m(this.castToString(a))}
// =============================
// Helpers
// =============================
/**
     * castToString()
     *
     * casts the input to a string
     * @param input the input to cast.
     */
castToString(a){return null==a?"":"string"===typeof a?a:a.toString()}}
/**
 * IdException
 *
 * Indicates an error with the ID.
 */class pa extends x{constructor(a="Invalid ID"){super(a)}}
/**
 * UUIDException
 *
 * Indicates an error with the UUID.
 */class oa extends pa{constructor(a="UUID Error"){super(a)}}
/**
 * Id
 *
 * Id represents a generic ID.
 */class ca{
/**
     * Creates a new Id instance.
     * @param value The value of the id.
     * @throws IdException when the value is invalid.
     */
constructor(a){if(!a)throw new pa;this._val=a}
/**
     * equals()
     *
     * equals() compares the suspect to the intance, to determine if they are equal.
     * @param suspect The suspect to compare.
     */equals(a){let l=!1;if(a instanceof ca){const n=a;l=this.id()===n.id()}return l}
/**
     * id()
     *
     * id() gets the value of the ID.
     */id(){return this._val}toString(){return this.id().toString()}}
/**
 * UUID
 *
 * UUID represents a UUID.
 */class ga extends ca{
/**
     * Creates a UUID instance.
     * @param value The value of the UUID.
     * @throws UUIDException if the value is invalid.
     */
constructor(a){if(!d(a))throw new oa;super(a)}
/**
     * _ParseNamespace()
     *
     * parses a namespace for v3 and v5 UUIDs.
     * @param namespace the namespace to parse.
     * @returns the parsed namespace.
     * @throws UUIDException when the namespace is not a valid UUID.
     */static _ParseNamespace(a){let l="";if(a instanceof ga)l=a.id();else
// we validate that the string is a valid UUID.
try{l=new ga(a.toString()).toString()}catch(a){
// the namespace is not a valid UUID.
throw new oa("Invalid namespace.")}return l}
/**
     * NIL()
     *
     * Creates the NIL UUID.
     * @returns a nil UUID (all zeros)
     */static NIL(){return new ga(k)}
/**
     * V1()
     *
     * Generates a Version 1 UUID (Timestamp).
     * @returns A version 1 UUID.
     */static V1(){return new ga(w())}
/**
     * V3()
     *
     * Creates a Version 3 UUID (namespace with MD5).
     * @param name the name
     * @param namespace a UUID
     * @returns a Version 3 UUID.
     * @throws UUIDException when the namespace is not a valid UUID.
     */static V3(a,l){return new ga(f(a,ga._ParseNamespace(l)))}
/**
     * V4()
     *
     * V4() generates a V4 UUID (random)
     * @returns a Version 4 UUID.
     */static V4(){return new ga(y())}
/**
     * V5()
     *
     * Creates a Version 5 UUID (namespace with SHA-1) UUID.
     * @param name the name
     * @param namespace the namespace
     * @returns a Version 5 UUID.
     * @throws UUIDException when the namespace is not a valid UUID.
     */static V5(a,l){return new ga(v(a,ga._ParseNamespace(l)))}
/**
     * equals()
     *
     * equals() compares the suspect to the instance, to determine if they are equal.
     * @param suspect The suspect to be compared.
     */equals(a){let l=!1;if(a instanceof ga){const n=a;l=this.id()===n.id()}return l}
/**
     * id()
     *
     * id() gets the value of the id.
     */id(){return super.id()}
/**
     * version()
     *
     * gets teh version of the UUID.
     */version(){return S(this.id())}}
/**
 * IsoLanguageException
 *
 * An IsoLanguage Error
 */class ba extends C{constructor(a="Language Error"){super(a)}}var Fa=[{English:"Afar",French:"afar",alpha2:"aa","alpha3-b":"aar","alpha3-t":null},{English:"Abkhazian",French:"abkhaze",alpha2:"ab","alpha3-b":"abk","alpha3-t":null},{English:"Achinese",French:"aceh",alpha2:null,"alpha3-b":"ace","alpha3-t":null},{English:"Acoli",French:"acoli",alpha2:null,"alpha3-b":"ach","alpha3-t":null},{English:"Adangme",French:"adangme",alpha2:null,"alpha3-b":"ada","alpha3-t":null},{English:"Adyghe; Adygei",French:"adyghé",alpha2:null,"alpha3-b":"ady","alpha3-t":null},{English:"Afro-Asiatic languages",French:"afro-asiatiques, langues",alpha2:null,"alpha3-b":"afa","alpha3-t":null},{English:"Afrihili",French:"afrihili",alpha2:null,"alpha3-b":"afh","alpha3-t":null},{English:"Afrikaans",French:"afrikaans",alpha2:"af","alpha3-b":"afr","alpha3-t":null},{English:"Ainu",French:"aïnou",alpha2:null,"alpha3-b":"ain","alpha3-t":null},{English:"Akan",French:"akan",alpha2:"ak","alpha3-b":"aka","alpha3-t":null},{English:"Akkadian",French:"akkadien",alpha2:null,"alpha3-b":"akk","alpha3-t":null},{English:"Albanian",French:"albanais",alpha2:"sq","alpha3-b":"alb","alpha3-t":"sqi"},{English:"Aleut",French:"aléoute",alpha2:null,"alpha3-b":"ale","alpha3-t":null},{English:"Algonquian languages",French:"algonquines, langues",alpha2:null,"alpha3-b":"alg","alpha3-t":null},{English:"Southern Altai",French:"altai du Sud",alpha2:null,"alpha3-b":"alt","alpha3-t":null},{English:"Amharic",French:"amharique",alpha2:"am","alpha3-b":"amh","alpha3-t":null},{English:"English, Old (ca.450-1100)",French:"anglo-saxon (ca.450-1100)",alpha2:null,"alpha3-b":"ang","alpha3-t":null},{English:"Angika",French:"angika",alpha2:null,"alpha3-b":"anp","alpha3-t":null},{English:"Apache languages",French:"apaches, langues",alpha2:null,"alpha3-b":"apa","alpha3-t":null},{English:"Arabic",French:"arabe",alpha2:"ar","alpha3-b":"ara","alpha3-t":null},{English:"Official Aramaic (700-300 BCE); Imperial Aramaic (700-300 BCE)",French:"araméen d'empire (700-300 BCE)",alpha2:null,"alpha3-b":"arc","alpha3-t":null},{English:"Aragonese",French:"aragonais",alpha2:"an","alpha3-b":"arg","alpha3-t":null},{English:"Armenian",French:"arménien",alpha2:"hy","alpha3-b":"arm","alpha3-t":"hye"},{English:"Mapudungun; Mapuche",French:"mapudungun; mapuche; mapuce",alpha2:null,"alpha3-b":"arn","alpha3-t":null},{English:"Arapaho",French:"arapaho",alpha2:null,"alpha3-b":"arp","alpha3-t":null},{English:"Artificial languages",French:"artificielles, langues",alpha2:null,"alpha3-b":"art","alpha3-t":null},{English:"Arawak",French:"arawak",alpha2:null,"alpha3-b":"arw","alpha3-t":null},{English:"Assamese",French:"assamais",alpha2:"as","alpha3-b":"asm","alpha3-t":null},{English:"Asturian; Bable; Leonese; Asturleonese",French:"asturien; bable; léonais; asturoléonais",alpha2:null,"alpha3-b":"ast","alpha3-t":null},{English:"Athapascan languages",French:"athapascanes, langues",alpha2:null,"alpha3-b":"ath","alpha3-t":null},{English:"Australian languages",French:"australiennes, langues",alpha2:null,"alpha3-b":"aus","alpha3-t":null},{English:"Avaric",French:"avar",alpha2:"av","alpha3-b":"ava","alpha3-t":null},{English:"Avestan",French:"avestique",alpha2:"ae","alpha3-b":"ave","alpha3-t":null},{English:"Awadhi",French:"awadhi",alpha2:null,"alpha3-b":"awa","alpha3-t":null},{English:"Aymara",French:"aymara",alpha2:"ay","alpha3-b":"aym","alpha3-t":null},{English:"Azerbaijani",French:"azéri",alpha2:"az","alpha3-b":"aze","alpha3-t":null},{English:"Banda languages",French:"banda, langues",alpha2:null,"alpha3-b":"bad","alpha3-t":null},{English:"Bamileke languages",French:"bamiléké, langues",alpha2:null,"alpha3-b":"bai","alpha3-t":null},{English:"Bashkir",French:"bachkir",alpha2:"ba","alpha3-b":"bak","alpha3-t":null},{English:"Baluchi",French:"baloutchi",alpha2:null,"alpha3-b":"bal","alpha3-t":null},{English:"Bambara",French:"bambara",alpha2:"bm","alpha3-b":"bam","alpha3-t":null},{English:"Balinese",French:"balinais",alpha2:null,"alpha3-b":"ban","alpha3-t":null},{English:"Basque",French:"basque",alpha2:"eu","alpha3-b":"baq","alpha3-t":"eus"},{English:"Basa",French:"basa",alpha2:null,"alpha3-b":"bas","alpha3-t":null},{English:"Baltic languages",French:"baltes, langues",alpha2:null,"alpha3-b":"bat","alpha3-t":null},{English:"Beja; Bedawiyet",French:"bedja",alpha2:null,"alpha3-b":"bej","alpha3-t":null},{English:"Belarusian",French:"biélorusse",alpha2:"be","alpha3-b":"bel","alpha3-t":null},{English:"Bemba",French:"bemba",alpha2:null,"alpha3-b":"bem","alpha3-t":null},{English:"Bengali",French:"bengali",alpha2:"bn","alpha3-b":"ben","alpha3-t":null},{English:"Berber languages",French:"berbères, langues",alpha2:null,"alpha3-b":"ber","alpha3-t":null},{English:"Bhojpuri",French:"bhojpuri",alpha2:null,"alpha3-b":"bho","alpha3-t":null},{English:"Bihari languages",French:"langues biharis",alpha2:"bh","alpha3-b":"bih","alpha3-t":null},{English:"Bikol",French:"bikol",alpha2:null,"alpha3-b":"bik","alpha3-t":null},{English:"Bini; Edo",French:"bini; edo",alpha2:null,"alpha3-b":"bin","alpha3-t":null},{English:"Bislama",French:"bichlamar",alpha2:"bi","alpha3-b":"bis","alpha3-t":null},{English:"Siksika",French:"blackfoot",alpha2:null,"alpha3-b":"bla","alpha3-t":null},{English:"Bantu languages",French:"bantou, langues",alpha2:null,"alpha3-b":"bnt","alpha3-t":null},{English:"Bosnian",French:"bosniaque",alpha2:"bs","alpha3-b":"bos","alpha3-t":null},{English:"Braj",French:"braj",alpha2:null,"alpha3-b":"bra","alpha3-t":null},{English:"Breton",French:"breton",alpha2:"br","alpha3-b":"bre","alpha3-t":null},{English:"Batak languages",French:"batak, langues",alpha2:null,"alpha3-b":"btk","alpha3-t":null},{English:"Buriat",French:"bouriate",alpha2:null,"alpha3-b":"bua","alpha3-t":null},{English:"Buginese",French:"bugi",alpha2:null,"alpha3-b":"bug","alpha3-t":null},{English:"Bulgarian",French:"bulgare",alpha2:"bg","alpha3-b":"bul","alpha3-t":null},{English:"Burmese",French:"birman",alpha2:"my","alpha3-b":"bur","alpha3-t":"mya"},{English:"Blin; Bilin",French:"blin; bilen",alpha2:null,"alpha3-b":"byn","alpha3-t":null},{English:"Caddo",French:"caddo",alpha2:null,"alpha3-b":"cad","alpha3-t":null},{English:"Central American Indian languages",French:"amérindiennes de L'Amérique centrale, langues",alpha2:null,"alpha3-b":"cai","alpha3-t":null},{English:"Galibi Carib",French:"karib; galibi; carib",alpha2:null,"alpha3-b":"car","alpha3-t":null},{English:"Catalan; Valencian",French:"catalan; valencien",alpha2:"ca","alpha3-b":"cat","alpha3-t":null},{English:"Caucasian languages",French:"caucasiennes, langues",alpha2:null,"alpha3-b":"cau","alpha3-t":null},{English:"Cebuano",French:"cebuano",alpha2:null,"alpha3-b":"ceb","alpha3-t":null},{English:"Celtic languages",French:"celtiques, langues; celtes, langues",alpha2:null,"alpha3-b":"cel","alpha3-t":null},{English:"Chamorro",French:"chamorro",alpha2:"ch","alpha3-b":"cha","alpha3-t":null},{English:"Chibcha",French:"chibcha",alpha2:null,"alpha3-b":"chb","alpha3-t":null},{English:"Chechen",French:"tchétchène",alpha2:"ce","alpha3-b":"che","alpha3-t":null},{English:"Chagatai",French:"djaghataï",alpha2:null,"alpha3-b":"chg","alpha3-t":null},{English:"Chinese",French:"chinois",alpha2:"zh","alpha3-b":"chi","alpha3-t":"zho"},{English:"Chuukese",French:"chuuk",alpha2:null,"alpha3-b":"chk","alpha3-t":null},{English:"Mari",French:"mari",alpha2:null,"alpha3-b":"chm","alpha3-t":null},{English:"Chinook jargon",French:"chinook, jargon",alpha2:null,"alpha3-b":"chn","alpha3-t":null},{English:"Choctaw",French:"choctaw",alpha2:null,"alpha3-b":"cho","alpha3-t":null},{English:"Chipewyan; Dene Suline",French:"chipewyan",alpha2:null,"alpha3-b":"chp","alpha3-t":null},{English:"Cherokee",French:"cherokee",alpha2:null,"alpha3-b":"chr","alpha3-t":null},{English:"Church Slavic; Old Slavonic; Church Slavonic; Old Bulgarian; Old Church Slavonic",French:"slavon d'église; vieux slave; slavon liturgique; vieux bulgare",alpha2:"cu","alpha3-b":"chu","alpha3-t":null},{English:"Chuvash",French:"tchouvache",alpha2:"cv","alpha3-b":"chv","alpha3-t":null},{English:"Cheyenne",French:"cheyenne",alpha2:null,"alpha3-b":"chy","alpha3-t":null},{English:"Chamic languages",French:"chames, langues",alpha2:null,"alpha3-b":"cmc","alpha3-t":null},{English:"Montenegrin",French:"monténégrin",alpha2:null,"alpha3-b":"cnr","alpha3-t":null},{English:"Coptic",French:"copte",alpha2:null,"alpha3-b":"cop","alpha3-t":null},{English:"Cornish",French:"cornique",alpha2:"kw","alpha3-b":"cor","alpha3-t":null},{English:"Corsican",French:"corse",alpha2:"co","alpha3-b":"cos","alpha3-t":null},{English:"Creoles and pidgins, English based",French:"créoles et pidgins basés sur l'anglais",alpha2:null,"alpha3-b":"cpe","alpha3-t":null},{English:"Creoles and pidgins, French-based",French:"créoles et pidgins basés sur le français",alpha2:null,"alpha3-b":"cpf","alpha3-t":null},{English:"Creoles and pidgins, Portuguese-based",French:"créoles et pidgins basés sur le portugais",alpha2:null,"alpha3-b":"cpp","alpha3-t":null},{English:"Cree",French:"cree",alpha2:"cr","alpha3-b":"cre","alpha3-t":null},{English:"Crimean Tatar; Crimean Turkish",French:"tatar de Crimé",alpha2:null,"alpha3-b":"crh","alpha3-t":null},{English:"Creoles and pidgins",French:"créoles et pidgins",alpha2:null,"alpha3-b":"crp","alpha3-t":null},{English:"Kashubian",French:"kachoube",alpha2:null,"alpha3-b":"csb","alpha3-t":null},{English:"Cushitic languages",French:"couchitiques, langues",alpha2:null,"alpha3-b":"cus","alpha3-t":null},{English:"Czech",French:"tchèque",alpha2:"cs","alpha3-b":"cze","alpha3-t":"ces"},{English:"Dakota",French:"dakota",alpha2:null,"alpha3-b":"dak","alpha3-t":null},{English:"Danish",French:"danois",alpha2:"da","alpha3-b":"dan","alpha3-t":null},{English:"Dargwa",French:"dargwa",alpha2:null,"alpha3-b":"dar","alpha3-t":null},{English:"Land Dayak languages",French:"dayak, langues",alpha2:null,"alpha3-b":"day","alpha3-t":null},{English:"Delaware",French:"delaware",alpha2:null,"alpha3-b":"del","alpha3-t":null},{English:"Slave (Athapascan)",French:"esclave (athapascan)",alpha2:null,"alpha3-b":"den","alpha3-t":null},{English:"Dogrib",French:"dogrib",alpha2:null,"alpha3-b":"dgr","alpha3-t":null},{English:"Dinka",French:"dinka",alpha2:null,"alpha3-b":"din","alpha3-t":null},{English:"Divehi; Dhivehi; Maldivian",French:"maldivien",alpha2:"dv","alpha3-b":"div","alpha3-t":null},{English:"Dogri",French:"dogri",alpha2:null,"alpha3-b":"doi","alpha3-t":null},{English:"Dravidian languages",French:"dravidiennes, langues",alpha2:null,"alpha3-b":"dra","alpha3-t":null},{English:"Lower Sorbian",French:"bas-sorabe",alpha2:null,"alpha3-b":"dsb","alpha3-t":null},{English:"Duala",French:"douala",alpha2:null,"alpha3-b":"dua","alpha3-t":null},{English:"Dutch, Middle (ca.1050-1350)",French:"néerlandais moyen (ca. 1050-1350)",alpha2:null,"alpha3-b":"dum","alpha3-t":null},{English:"Dutch; Flemish",French:"néerlandais; flamand",alpha2:"nl","alpha3-b":"dut","alpha3-t":"nld"},{English:"Dyula",French:"dioula",alpha2:null,"alpha3-b":"dyu","alpha3-t":null},{English:"Dzongkha",French:"dzongkha",alpha2:"dz","alpha3-b":"dzo","alpha3-t":null},{English:"Efik",French:"efik",alpha2:null,"alpha3-b":"efi","alpha3-t":null},{English:"Egyptian (Ancient)",French:"égyptien",alpha2:null,"alpha3-b":"egy","alpha3-t":null},{English:"Ekajuk",French:"ekajuk",alpha2:null,"alpha3-b":"eka","alpha3-t":null},{English:"Elamite",French:"élamite",alpha2:null,"alpha3-b":"elx","alpha3-t":null},{English:"English",French:"anglais",alpha2:"en","alpha3-b":"eng","alpha3-t":null},{English:"English, Middle (1100-1500)",French:"anglais moyen (1100-1500)",alpha2:null,"alpha3-b":"enm","alpha3-t":null},{English:"Esperanto",French:"espéranto",alpha2:"eo","alpha3-b":"epo","alpha3-t":null},{English:"Estonian",French:"estonien",alpha2:"et","alpha3-b":"est","alpha3-t":null},{English:"Ewe",French:"éwé",alpha2:"ee","alpha3-b":"ewe","alpha3-t":null},{English:"Ewondo",French:"éwondo",alpha2:null,"alpha3-b":"ewo","alpha3-t":null},{English:"Fang",French:"fang",alpha2:null,"alpha3-b":"fan","alpha3-t":null},{English:"Faroese",French:"féroïen",alpha2:"fo","alpha3-b":"fao","alpha3-t":null},{English:"Fanti",French:"fanti",alpha2:null,"alpha3-b":"fat","alpha3-t":null},{English:"Fijian",French:"fidjien",alpha2:"fj","alpha3-b":"fij","alpha3-t":null},{English:"Filipino; Pilipino",French:"filipino; pilipino",alpha2:null,"alpha3-b":"fil","alpha3-t":null},{English:"Finnish",French:"finnois",alpha2:"fi","alpha3-b":"fin","alpha3-t":null},{English:"Finno-Ugrian languages",French:"finno-ougriennes, langues",alpha2:null,"alpha3-b":"fiu","alpha3-t":null},{English:"Fon",French:"fon",alpha2:null,"alpha3-b":"fon","alpha3-t":null},{English:"French",French:"français",alpha2:"fr","alpha3-b":"fre","alpha3-t":"fra"},{English:"French, Middle (ca.1400-1600)",French:"français moyen (1400-1600)",alpha2:null,"alpha3-b":"frm","alpha3-t":null},{English:"French, Old (842-ca.1400)",French:"français ancien (842-ca.1400)",alpha2:null,"alpha3-b":"fro","alpha3-t":null},{English:"Northern Frisian",French:"frison septentrional",alpha2:null,"alpha3-b":"frr","alpha3-t":null},{English:"Eastern Frisian",French:"frison oriental",alpha2:null,"alpha3-b":"frs","alpha3-t":null},{English:"Western Frisian",French:"frison occidental",alpha2:"fy","alpha3-b":"fry","alpha3-t":null},{English:"Fulah",French:"peul",alpha2:"ff","alpha3-b":"ful","alpha3-t":null},{English:"Friulian",French:"frioulan",alpha2:null,"alpha3-b":"fur","alpha3-t":null},{English:"Ga",French:"ga",alpha2:null,"alpha3-b":"gaa","alpha3-t":null},{English:"Gayo",French:"gayo",alpha2:null,"alpha3-b":"gay","alpha3-t":null},{English:"Gbaya",French:"gbaya",alpha2:null,"alpha3-b":"gba","alpha3-t":null},{English:"Germanic languages",French:"germaniques, langues",alpha2:null,"alpha3-b":"gem","alpha3-t":null},{English:"Georgian",French:"géorgien",alpha2:"ka","alpha3-b":"geo","alpha3-t":"kat"},{English:"German",French:"allemand",alpha2:"de","alpha3-b":"ger","alpha3-t":"deu"},{English:"Geez",French:"guèze",alpha2:null,"alpha3-b":"gez","alpha3-t":null},{English:"Gilbertese",French:"kiribati",alpha2:null,"alpha3-b":"gil","alpha3-t":null},{English:"Gaelic; Scottish Gaelic",French:"gaélique; gaélique écossais",alpha2:"gd","alpha3-b":"gla","alpha3-t":null},{English:"Irish",French:"irlandais",alpha2:"ga","alpha3-b":"gle","alpha3-t":null},{English:"Galician",French:"galicien",alpha2:"gl","alpha3-b":"glg","alpha3-t":null},{English:"Manx",French:"manx; mannois",alpha2:"gv","alpha3-b":"glv","alpha3-t":null},{English:"German, Middle High (ca.1050-1500)",French:"allemand, moyen haut (ca. 1050-1500)",alpha2:null,"alpha3-b":"gmh","alpha3-t":null},{English:"German, Old High (ca.750-1050)",French:"allemand, vieux haut (ca. 750-1050)",alpha2:null,"alpha3-b":"goh","alpha3-t":null},{English:"Gondi",French:"gond",alpha2:null,"alpha3-b":"gon","alpha3-t":null},{English:"Gorontalo",French:"gorontalo",alpha2:null,"alpha3-b":"gor","alpha3-t":null},{English:"Gothic",French:"gothique",alpha2:null,"alpha3-b":"got","alpha3-t":null},{English:"Grebo",French:"grebo",alpha2:null,"alpha3-b":"grb","alpha3-t":null},{English:"Greek, Ancient (to 1453)",French:"grec ancien (jusqu'à 1453)",alpha2:null,"alpha3-b":"grc","alpha3-t":null},{English:"Greek, Modern (1453-)",French:"grec moderne (après 1453)",alpha2:"el","alpha3-b":"gre","alpha3-t":"ell"},{English:"Guarani",French:"guarani",alpha2:"gn","alpha3-b":"grn","alpha3-t":null},{English:"Swiss German; Alemannic; Alsatian",French:"suisse alémanique; alémanique; alsacien",alpha2:null,"alpha3-b":"gsw","alpha3-t":null},{English:"Gujarati",French:"goudjrati",alpha2:"gu","alpha3-b":"guj","alpha3-t":null},{English:"Gwich'in",French:"gwich'in",alpha2:null,"alpha3-b":"gwi","alpha3-t":null},{English:"Haida",French:"haida",alpha2:null,"alpha3-b":"hai","alpha3-t":null},{English:"Haitian; Haitian Creole",French:"haïtien; créole haïtien",alpha2:"ht","alpha3-b":"hat","alpha3-t":null},{English:"Hausa",French:"haoussa",alpha2:"ha","alpha3-b":"hau","alpha3-t":null},{English:"Hawaiian",French:"hawaïen",alpha2:null,"alpha3-b":"haw","alpha3-t":null},{English:"Hebrew",French:"hébreu",alpha2:"he","alpha3-b":"heb","alpha3-t":null},{English:"Herero",French:"herero",alpha2:"hz","alpha3-b":"her","alpha3-t":null},{English:"Hiligaynon",French:"hiligaynon",alpha2:null,"alpha3-b":"hil","alpha3-t":null},{English:"Himachali languages; Western Pahari languages",French:"langues himachalis; langues paharis occidentales",alpha2:null,"alpha3-b":"him","alpha3-t":null},{English:"Hindi",French:"hindi",alpha2:"hi","alpha3-b":"hin","alpha3-t":null},{English:"Hittite",French:"hittite",alpha2:null,"alpha3-b":"hit","alpha3-t":null},{English:"Hmong; Mong",French:"hmong",alpha2:null,"alpha3-b":"hmn","alpha3-t":null},{English:"Hiri Motu",French:"hiri motu",alpha2:"ho","alpha3-b":"hmo","alpha3-t":null},{English:"Croatian",French:"croate",alpha2:"hr","alpha3-b":"hrv","alpha3-t":null},{English:"Upper Sorbian",French:"haut-sorabe",alpha2:null,"alpha3-b":"hsb","alpha3-t":null},{English:"Hungarian",French:"hongrois",alpha2:"hu","alpha3-b":"hun","alpha3-t":null},{English:"Hupa",French:"hupa",alpha2:null,"alpha3-b":"hup","alpha3-t":null},{English:"Iban",French:"iban",alpha2:null,"alpha3-b":"iba","alpha3-t":null},{English:"Igbo",French:"igbo",alpha2:"ig","alpha3-b":"ibo","alpha3-t":null},{English:"Icelandic",French:"islandais",alpha2:"is","alpha3-b":"ice","alpha3-t":"isl"},{English:"Ido",French:"ido",alpha2:"io","alpha3-b":"ido","alpha3-t":null},{English:"Sichuan Yi; Nuosu",French:"yi de Sichuan",alpha2:"ii","alpha3-b":"iii","alpha3-t":null},{English:"Ijo languages",French:"ijo, langues",alpha2:null,"alpha3-b":"ijo","alpha3-t":null},{English:"Inuktitut",French:"inuktitut",alpha2:"iu","alpha3-b":"iku","alpha3-t":null},{English:"Interlingue; Occidental",French:"interlingue",alpha2:"ie","alpha3-b":"ile","alpha3-t":null},{English:"Iloko",French:"ilocano",alpha2:null,"alpha3-b":"ilo","alpha3-t":null},{English:"Interlingua (International Auxiliary Language Association)",French:"interlingua (langue auxiliaire internationale)",alpha2:"ia","alpha3-b":"ina","alpha3-t":null},{English:"Indic languages",French:"indo-aryennes, langues",alpha2:null,"alpha3-b":"inc","alpha3-t":null},{English:"Indonesian",French:"indonésien",alpha2:"id","alpha3-b":"ind","alpha3-t":null},{English:"Indo-European languages",French:"indo-européennes, langues",alpha2:null,"alpha3-b":"ine","alpha3-t":null},{English:"Ingush",French:"ingouche",alpha2:null,"alpha3-b":"inh","alpha3-t":null},{English:"Inupiaq",French:"inupiaq",alpha2:"ik","alpha3-b":"ipk","alpha3-t":null},{English:"Iranian languages",French:"iraniennes, langues",alpha2:null,"alpha3-b":"ira","alpha3-t":null},{English:"Iroquoian languages",French:"iroquoises, langues",alpha2:null,"alpha3-b":"iro","alpha3-t":null},{English:"Italian",French:"italien",alpha2:"it","alpha3-b":"ita","alpha3-t":null},{English:"Javanese",French:"javanais",alpha2:"jv","alpha3-b":"jav","alpha3-t":null},{English:"Lojban",French:"lojban",alpha2:null,"alpha3-b":"jbo","alpha3-t":null},{English:"Japanese",French:"japonais",alpha2:"ja","alpha3-b":"jpn","alpha3-t":null},{English:"Judeo-Persian",French:"judéo-persan",alpha2:null,"alpha3-b":"jpr","alpha3-t":null},{English:"Judeo-Arabic",French:"judéo-arabe",alpha2:null,"alpha3-b":"jrb","alpha3-t":null},{English:"Kara-Kalpak",French:"karakalpak",alpha2:null,"alpha3-b":"kaa","alpha3-t":null},{English:"Kabyle",French:"kabyle",alpha2:null,"alpha3-b":"kab","alpha3-t":null},{English:"Kachin; Jingpho",French:"kachin; jingpho",alpha2:null,"alpha3-b":"kac","alpha3-t":null},{English:"Kalaallisut; Greenlandic",French:"groenlandais",alpha2:"kl","alpha3-b":"kal","alpha3-t":null},{English:"Kamba",French:"kamba",alpha2:null,"alpha3-b":"kam","alpha3-t":null},{English:"Kannada",French:"kannada",alpha2:"kn","alpha3-b":"kan","alpha3-t":null},{English:"Karen languages",French:"karen, langues",alpha2:null,"alpha3-b":"kar","alpha3-t":null},{English:"Kashmiri",French:"kashmiri",alpha2:"ks","alpha3-b":"kas","alpha3-t":null},{English:"Kanuri",French:"kanouri",alpha2:"kr","alpha3-b":"kau","alpha3-t":null},{English:"Kawi",French:"kawi",alpha2:null,"alpha3-b":"kaw","alpha3-t":null},{English:"Kazakh",French:"kazakh",alpha2:"kk","alpha3-b":"kaz","alpha3-t":null},{English:"Kabardian",French:"kabardien",alpha2:null,"alpha3-b":"kbd","alpha3-t":null},{English:"Khasi",French:"khasi",alpha2:null,"alpha3-b":"kha","alpha3-t":null},{English:"Khoisan languages",French:"khoïsan, langues",alpha2:null,"alpha3-b":"khi","alpha3-t":null},{English:"Central Khmer",French:"khmer central",alpha2:"km","alpha3-b":"khm","alpha3-t":null},{English:"Khotanese; Sakan",French:"khotanais; sakan",alpha2:null,"alpha3-b":"kho","alpha3-t":null},{English:"Kikuyu; Gikuyu",French:"kikuyu",alpha2:"ki","alpha3-b":"kik","alpha3-t":null},{English:"Kinyarwanda",French:"rwanda",alpha2:"rw","alpha3-b":"kin","alpha3-t":null},{English:"Kirghiz; Kyrgyz",French:"kirghiz",alpha2:"ky","alpha3-b":"kir","alpha3-t":null},{English:"Kimbundu",French:"kimbundu",alpha2:null,"alpha3-b":"kmb","alpha3-t":null},{English:"Konkani",French:"konkani",alpha2:null,"alpha3-b":"kok","alpha3-t":null},{English:"Komi",French:"kom",alpha2:"kv","alpha3-b":"kom","alpha3-t":null},{English:"Kongo",French:"kongo",alpha2:"kg","alpha3-b":"kon","alpha3-t":null},{English:"Korean",French:"coréen",alpha2:"ko","alpha3-b":"kor","alpha3-t":null},{English:"Kosraean",French:"kosrae",alpha2:null,"alpha3-b":"kos","alpha3-t":null},{English:"Kpelle",French:"kpellé",alpha2:null,"alpha3-b":"kpe","alpha3-t":null},{English:"Karachay-Balkar",French:"karatchai balkar",alpha2:null,"alpha3-b":"krc","alpha3-t":null},{English:"Karelian",French:"carélien",alpha2:null,"alpha3-b":"krl","alpha3-t":null},{English:"Kru languages",French:"krou, langues",alpha2:null,"alpha3-b":"kro","alpha3-t":null},{English:"Kurukh",French:"kurukh",alpha2:null,"alpha3-b":"kru","alpha3-t":null},{English:"Kuanyama; Kwanyama",French:"kuanyama; kwanyama",alpha2:"kj","alpha3-b":"kua","alpha3-t":null},{English:"Kumyk",French:"koumyk",alpha2:null,"alpha3-b":"kum","alpha3-t":null},{English:"Kurdish",French:"kurde",alpha2:"ku","alpha3-b":"kur","alpha3-t":null},{English:"Kutenai",French:"kutenai",alpha2:null,"alpha3-b":"kut","alpha3-t":null},{English:"Ladino",French:"judéo-espagnol",alpha2:null,"alpha3-b":"lad","alpha3-t":null},{English:"Lahnda",French:"lahnda",alpha2:null,"alpha3-b":"lah","alpha3-t":null},{English:"Lamba",French:"lamba",alpha2:null,"alpha3-b":"lam","alpha3-t":null},{English:"Lao",French:"lao",alpha2:"lo","alpha3-b":"lao","alpha3-t":null},{English:"Latin",French:"latin",alpha2:"la","alpha3-b":"lat","alpha3-t":null},{English:"Latvian",French:"letton",alpha2:"lv","alpha3-b":"lav","alpha3-t":null},{English:"Lezghian",French:"lezghien",alpha2:null,"alpha3-b":"lez","alpha3-t":null},{English:"Limburgan; Limburger; Limburgish",French:"limbourgeois",alpha2:"li","alpha3-b":"lim","alpha3-t":null},{English:"Lingala",French:"lingala",alpha2:"ln","alpha3-b":"lin","alpha3-t":null},{English:"Lithuanian",French:"lituanien",alpha2:"lt","alpha3-b":"lit","alpha3-t":null},{English:"Mongo",French:"mongo",alpha2:null,"alpha3-b":"lol","alpha3-t":null},{English:"Lozi",French:"lozi",alpha2:null,"alpha3-b":"loz","alpha3-t":null},{English:"Luxembourgish; Letzeburgesch",French:"luxembourgeois",alpha2:"lb","alpha3-b":"ltz","alpha3-t":null},{English:"Luba-Lulua",French:"luba-lulua",alpha2:null,"alpha3-b":"lua","alpha3-t":null},{English:"Luba-Katanga",French:"luba-katanga",alpha2:"lu","alpha3-b":"lub","alpha3-t":null},{English:"Ganda",French:"ganda",alpha2:"lg","alpha3-b":"lug","alpha3-t":null},{English:"Luiseno",French:"luiseno",alpha2:null,"alpha3-b":"lui","alpha3-t":null},{English:"Lunda",French:"lunda",alpha2:null,"alpha3-b":"lun","alpha3-t":null},{English:"Luo (Kenya and Tanzania)",French:"luo (Kenya et Tanzanie)",alpha2:null,"alpha3-b":"luo","alpha3-t":null},{English:"Lushai",French:"lushai",alpha2:null,"alpha3-b":"lus","alpha3-t":null},{English:"Macedonian",French:"macédonien",alpha2:"mk","alpha3-b":"mac","alpha3-t":"mkd"},{English:"Madurese",French:"madourais",alpha2:null,"alpha3-b":"mad","alpha3-t":null},{English:"Magahi",French:"magahi",alpha2:null,"alpha3-b":"mag","alpha3-t":null},{English:"Marshallese",French:"marshall",alpha2:"mh","alpha3-b":"mah","alpha3-t":null},{English:"Maithili",French:"maithili",alpha2:null,"alpha3-b":"mai","alpha3-t":null},{English:"Makasar",French:"makassar",alpha2:null,"alpha3-b":"mak","alpha3-t":null},{English:"Malayalam",French:"malayalam",alpha2:"ml","alpha3-b":"mal","alpha3-t":null},{English:"Mandingo",French:"mandingue",alpha2:null,"alpha3-b":"man","alpha3-t":null},{English:"Maori",French:"maori",alpha2:"mi","alpha3-b":"mao","alpha3-t":"mri"},{English:"Austronesian languages",French:"austronésiennes, langues",alpha2:null,"alpha3-b":"map","alpha3-t":null},{English:"Marathi",French:"marathe",alpha2:"mr","alpha3-b":"mar","alpha3-t":null},{English:"Masai",French:"massaï",alpha2:null,"alpha3-b":"mas","alpha3-t":null},{English:"Malay",French:"malais",alpha2:"ms","alpha3-b":"may","alpha3-t":"msa"},{English:"Moksha",French:"moksa",alpha2:null,"alpha3-b":"mdf","alpha3-t":null},{English:"Mandar",French:"mandar",alpha2:null,"alpha3-b":"mdr","alpha3-t":null},{English:"Mende",French:"mendé",alpha2:null,"alpha3-b":"men","alpha3-t":null},{English:"Irish, Middle (900-1200)",French:"irlandais moyen (900-1200)",alpha2:null,"alpha3-b":"mga","alpha3-t":null},{English:"Mi'kmaq; Micmac",French:"mi'kmaq; micmac",alpha2:null,"alpha3-b":"mic","alpha3-t":null},{English:"Minangkabau",French:"minangkabau",alpha2:null,"alpha3-b":"min","alpha3-t":null},{English:"Uncoded languages",French:"langues non codées",alpha2:null,"alpha3-b":"mis","alpha3-t":null},{English:"Mon-Khmer languages",French:"môn-khmer, langues",alpha2:null,"alpha3-b":"mkh","alpha3-t":null},{English:"Malagasy",French:"malgache",alpha2:"mg","alpha3-b":"mlg","alpha3-t":null},{English:"Maltese",French:"maltais",alpha2:"mt","alpha3-b":"mlt","alpha3-t":null},{English:"Manchu",French:"mandchou",alpha2:null,"alpha3-b":"mnc","alpha3-t":null},{English:"Manipuri",French:"manipuri",alpha2:null,"alpha3-b":"mni","alpha3-t":null},{English:"Manobo languages",French:"manobo, langues",alpha2:null,"alpha3-b":"mno","alpha3-t":null},{English:"Mohawk",French:"mohawk",alpha2:null,"alpha3-b":"moh","alpha3-t":null},{English:"Mongolian",French:"mongol",alpha2:"mn","alpha3-b":"mon","alpha3-t":null},{English:"Mossi",French:"moré",alpha2:null,"alpha3-b":"mos","alpha3-t":null},{English:"Multiple languages",French:"multilingue",alpha2:null,"alpha3-b":"mul","alpha3-t":null},{English:"Munda languages",French:"mounda, langues",alpha2:null,"alpha3-b":"mun","alpha3-t":null},{English:"Creek",French:"muskogee",alpha2:null,"alpha3-b":"mus","alpha3-t":null},{English:"Mirandese",French:"mirandais",alpha2:null,"alpha3-b":"mwl","alpha3-t":null},{English:"Marwari",French:"marvari",alpha2:null,"alpha3-b":"mwr","alpha3-t":null},{English:"Mayan languages",French:"maya, langues",alpha2:null,"alpha3-b":"myn","alpha3-t":null},{English:"Erzya",French:"erza",alpha2:null,"alpha3-b":"myv","alpha3-t":null},{English:"Nahuatl languages",French:"nahuatl, langues",alpha2:null,"alpha3-b":"nah","alpha3-t":null},{English:"North American Indian languages",French:"nord-amérindiennes, langues",alpha2:null,"alpha3-b":"nai","alpha3-t":null},{English:"Neapolitan",French:"napolitain",alpha2:null,"alpha3-b":"nap","alpha3-t":null},{English:"Nauru",French:"nauruan",alpha2:"na","alpha3-b":"nau","alpha3-t":null},{English:"Navajo; Navaho",French:"navaho",alpha2:"nv","alpha3-b":"nav","alpha3-t":null},{English:"Ndebele, South; South Ndebele",French:"ndébélé du Sud",alpha2:"nr","alpha3-b":"nbl","alpha3-t":null},{English:"Ndebele, North; North Ndebele",French:"ndébélé du Nord",alpha2:"nd","alpha3-b":"nde","alpha3-t":null},{English:"Ndonga",French:"ndonga",alpha2:"ng","alpha3-b":"ndo","alpha3-t":null},{English:"Low German; Low Saxon; German, Low; Saxon, Low",French:"bas allemand; bas saxon; allemand, bas; saxon, bas",alpha2:null,"alpha3-b":"nds","alpha3-t":null},{English:"Nepali",French:"népalais",alpha2:"ne","alpha3-b":"nep","alpha3-t":null},{English:"Nepal Bhasa; Newari",French:"nepal bhasa; newari",alpha2:null,"alpha3-b":"new","alpha3-t":null},{English:"Nias",French:"nias",alpha2:null,"alpha3-b":"nia","alpha3-t":null},{English:"Niger-Kordofanian languages",French:"nigéro-kordofaniennes, langues",alpha2:null,"alpha3-b":"nic","alpha3-t":null},{English:"Niuean",French:"niué",alpha2:null,"alpha3-b":"niu","alpha3-t":null},{English:"Norwegian Nynorsk; Nynorsk, Norwegian",French:"norvégien nynorsk; nynorsk, norvégien",alpha2:"nn","alpha3-b":"nno","alpha3-t":null},{English:"Bokmål, Norwegian; Norwegian Bokmål",French:"norvégien bokmål",alpha2:"nb","alpha3-b":"nob","alpha3-t":null},{English:"Nogai",French:"nogaï; nogay",alpha2:null,"alpha3-b":"nog","alpha3-t":null},{English:"Norse, Old",French:"norrois, vieux",alpha2:null,"alpha3-b":"non","alpha3-t":null},{English:"Norwegian",French:"norvégien",alpha2:"no","alpha3-b":"nor","alpha3-t":null},{English:"N'Ko",French:"n'ko",alpha2:null,"alpha3-b":"nqo","alpha3-t":null},{English:"Pedi; Sepedi; Northern Sotho",French:"pedi; sepedi; sotho du Nord",alpha2:null,"alpha3-b":"nso","alpha3-t":null},{English:"Nubian languages",French:"nubiennes, langues",alpha2:null,"alpha3-b":"nub","alpha3-t":null},{English:"Classical Newari; Old Newari; Classical Nepal Bhasa",French:"newari classique",alpha2:null,"alpha3-b":"nwc","alpha3-t":null},{English:"Chichewa; Chewa; Nyanja",French:"chichewa; chewa; nyanja",alpha2:"ny","alpha3-b":"nya","alpha3-t":null},{English:"Nyamwezi",French:"nyamwezi",alpha2:null,"alpha3-b":"nym","alpha3-t":null},{English:"Nyankole",French:"nyankolé",alpha2:null,"alpha3-b":"nyn","alpha3-t":null},{English:"Nyoro",French:"nyoro",alpha2:null,"alpha3-b":"nyo","alpha3-t":null},{English:"Nzima",French:"nzema",alpha2:null,"alpha3-b":"nzi","alpha3-t":null},{English:"Occitan (post 1500)",French:"occitan (après 1500)",alpha2:"oc","alpha3-b":"oci","alpha3-t":null},{English:"Ojibwa",French:"ojibwa",alpha2:"oj","alpha3-b":"oji","alpha3-t":null},{English:"Oriya",French:"oriya",alpha2:"or","alpha3-b":"ori","alpha3-t":null},{English:"Oromo",French:"galla",alpha2:"om","alpha3-b":"orm","alpha3-t":null},{English:"Osage",French:"osage",alpha2:null,"alpha3-b":"osa","alpha3-t":null},{English:"Ossetian; Ossetic",French:"ossète",alpha2:"os","alpha3-b":"oss","alpha3-t":null},{English:"Turkish, Ottoman (1500-1928)",French:"turc ottoman (1500-1928)",alpha2:null,"alpha3-b":"ota","alpha3-t":null},{English:"Otomian languages",French:"otomi, langues",alpha2:null,"alpha3-b":"oto","alpha3-t":null},{English:"Papuan languages",French:"papoues, langues",alpha2:null,"alpha3-b":"paa","alpha3-t":null},{English:"Pangasinan",French:"pangasinan",alpha2:null,"alpha3-b":"pag","alpha3-t":null},{English:"Pahlavi",French:"pahlavi",alpha2:null,"alpha3-b":"pal","alpha3-t":null},{English:"Pampanga; Kapampangan",French:"pampangan",alpha2:null,"alpha3-b":"pam","alpha3-t":null},{English:"Panjabi; Punjabi",French:"pendjabi",alpha2:"pa","alpha3-b":"pan","alpha3-t":null},{English:"Papiamento",French:"papiamento",alpha2:null,"alpha3-b":"pap","alpha3-t":null},{English:"Palauan",French:"palau",alpha2:null,"alpha3-b":"pau","alpha3-t":null},{English:"Persian, Old (ca.600-400 B.C.)",French:"perse, vieux (ca. 600-400 av. J.-C.)",alpha2:null,"alpha3-b":"peo","alpha3-t":null},{English:"Persian",French:"persan",alpha2:"fa","alpha3-b":"per","alpha3-t":"fas"},{English:"Philippine languages",French:"philippines, langues",alpha2:null,"alpha3-b":"phi","alpha3-t":null},{English:"Phoenician",French:"phénicien",alpha2:null,"alpha3-b":"phn","alpha3-t":null},{English:"Pali",French:"pali",alpha2:"pi","alpha3-b":"pli","alpha3-t":null},{English:"Polish",French:"polonais",alpha2:"pl","alpha3-b":"pol","alpha3-t":null},{English:"Pohnpeian",French:"pohnpei",alpha2:null,"alpha3-b":"pon","alpha3-t":null},{English:"Portuguese",French:"portugais",alpha2:"pt","alpha3-b":"por","alpha3-t":null},{English:"Prakrit languages",French:"prâkrit, langues",alpha2:null,"alpha3-b":"pra","alpha3-t":null},{English:"Provençal, Old (to 1500); Occitan, Old (to 1500)",French:"provençal ancien (jusqu'à 1500); occitan ancien (jusqu'à 1500)",alpha2:null,"alpha3-b":"pro","alpha3-t":null},{English:"Pushto; Pashto",French:"pachto",alpha2:"ps","alpha3-b":"pus","alpha3-t":null},{English:"Reserved for local use",French:"réservée à l'usage local",alpha2:null,"alpha3-b":"qaa-qtz","alpha3-t":null},{English:"Quechua",French:"quechua",alpha2:"qu","alpha3-b":"que","alpha3-t":null},{English:"Rajasthani",French:"rajasthani",alpha2:null,"alpha3-b":"raj","alpha3-t":null},{English:"Rapanui",French:"rapanui",alpha2:null,"alpha3-b":"rap","alpha3-t":null},{English:"Rarotongan; Cook Islands Maori",French:"rarotonga; maori des îles Cook",alpha2:null,"alpha3-b":"rar","alpha3-t":null},{English:"Romance languages",French:"romanes, langues",alpha2:null,"alpha3-b":"roa","alpha3-t":null},{English:"Romansh",French:"romanche",alpha2:"rm","alpha3-b":"roh","alpha3-t":null},{English:"Romany",French:"tsigane",alpha2:null,"alpha3-b":"rom","alpha3-t":null},{English:"Romanian; Moldavian; Moldovan",French:"roumain; moldave",alpha2:"ro","alpha3-b":"rum","alpha3-t":"ron"},{English:"Rundi",French:"rundi",alpha2:"rn","alpha3-b":"run","alpha3-t":null},{English:"Aromanian; Arumanian; Macedo-Romanian",French:"aroumain; macédo-roumain",alpha2:null,"alpha3-b":"rup","alpha3-t":null},{English:"Russian",French:"russe",alpha2:"ru","alpha3-b":"rus","alpha3-t":null},{English:"Sandawe",French:"sandawe",alpha2:null,"alpha3-b":"sad","alpha3-t":null},{English:"Sango",French:"sango",alpha2:"sg","alpha3-b":"sag","alpha3-t":null},{English:"Yakut",French:"iakoute",alpha2:null,"alpha3-b":"sah","alpha3-t":null},{English:"South American Indian languages",French:"sud-amérindiennes, langues",alpha2:null,"alpha3-b":"sai","alpha3-t":null},{English:"Salishan languages",French:"salishennes, langues",alpha2:null,"alpha3-b":"sal","alpha3-t":null},{English:"Samaritan Aramaic",French:"samaritain",alpha2:null,"alpha3-b":"sam","alpha3-t":null},{English:"Sanskrit",French:"sanskrit",alpha2:"sa","alpha3-b":"san","alpha3-t":null},{English:"Sasak",French:"sasak",alpha2:null,"alpha3-b":"sas","alpha3-t":null},{English:"Santali",French:"santal",alpha2:null,"alpha3-b":"sat","alpha3-t":null},{English:"Sicilian",French:"sicilien",alpha2:null,"alpha3-b":"scn","alpha3-t":null},{English:"Scots",French:"écossais",alpha2:null,"alpha3-b":"sco","alpha3-t":null},{English:"Selkup",French:"selkoupe",alpha2:null,"alpha3-b":"sel","alpha3-t":null},{English:"Semitic languages",French:"sémitiques, langues",alpha2:null,"alpha3-b":"sem","alpha3-t":null},{English:"Irish, Old (to 900)",French:"irlandais ancien (jusqu'à 900)",alpha2:null,"alpha3-b":"sga","alpha3-t":null},{English:"Sign Languages",French:"langues des signes",alpha2:null,"alpha3-b":"sgn","alpha3-t":null},{English:"Shan",French:"chan",alpha2:null,"alpha3-b":"shn","alpha3-t":null},{English:"Sidamo",French:"sidamo",alpha2:null,"alpha3-b":"sid","alpha3-t":null},{English:"Sinhala; Sinhalese",French:"singhalais",alpha2:"si","alpha3-b":"sin","alpha3-t":null},{English:"Siouan languages",French:"sioux, langues",alpha2:null,"alpha3-b":"sio","alpha3-t":null},{English:"Sino-Tibetan languages",French:"sino-tibétaines, langues",alpha2:null,"alpha3-b":"sit","alpha3-t":null},{English:"Slavic languages",French:"slaves, langues",alpha2:null,"alpha3-b":"sla","alpha3-t":null},{English:"Slovak",French:"slovaque",alpha2:"sk","alpha3-b":"slo","alpha3-t":"slk"},{English:"Slovenian",French:"slovène",alpha2:"sl","alpha3-b":"slv","alpha3-t":null},{English:"Southern Sami",French:"sami du Sud",alpha2:null,"alpha3-b":"sma","alpha3-t":null},{English:"Northern Sami",French:"sami du Nord",alpha2:"se","alpha3-b":"sme","alpha3-t":null},{English:"Sami languages",French:"sames, langues",alpha2:null,"alpha3-b":"smi","alpha3-t":null},{English:"Lule Sami",French:"sami de Lule",alpha2:null,"alpha3-b":"smj","alpha3-t":null},{English:"Inari Sami",French:"sami d'Inari",alpha2:null,"alpha3-b":"smn","alpha3-t":null},{English:"Samoan",French:"samoan",alpha2:"sm","alpha3-b":"smo","alpha3-t":null},{English:"Skolt Sami",French:"sami skolt",alpha2:null,"alpha3-b":"sms","alpha3-t":null},{English:"Shona",French:"shona",alpha2:"sn","alpha3-b":"sna","alpha3-t":null},{English:"Sindhi",French:"sindhi",alpha2:"sd","alpha3-b":"snd","alpha3-t":null},{English:"Soninke",French:"soninké",alpha2:null,"alpha3-b":"snk","alpha3-t":null},{English:"Sogdian",French:"sogdien",alpha2:null,"alpha3-b":"sog","alpha3-t":null},{English:"Somali",French:"somali",alpha2:"so","alpha3-b":"som","alpha3-t":null},{English:"Songhai languages",French:"songhai, langues",alpha2:null,"alpha3-b":"son","alpha3-t":null},{English:"Sotho, Southern",French:"sotho du Sud",alpha2:"st","alpha3-b":"sot","alpha3-t":null},{English:"Spanish; Castilian",French:"espagnol; castillan",alpha2:"es","alpha3-b":"spa","alpha3-t":null},{English:"Sardinian",French:"sarde",alpha2:"sc","alpha3-b":"srd","alpha3-t":null},{English:"Sranan Tongo",French:"sranan tongo",alpha2:null,"alpha3-b":"srn","alpha3-t":null},{English:"Serbian",French:"serbe",alpha2:"sr","alpha3-b":"srp","alpha3-t":null},{English:"Serer",French:"sérère",alpha2:null,"alpha3-b":"srr","alpha3-t":null},{English:"Nilo-Saharan languages",French:"nilo-sahariennes, langues",alpha2:null,"alpha3-b":"ssa","alpha3-t":null},{English:"Swati",French:"swati",alpha2:"ss","alpha3-b":"ssw","alpha3-t":null},{English:"Sukuma",French:"sukuma",alpha2:null,"alpha3-b":"suk","alpha3-t":null},{English:"Sundanese",French:"soundanais",alpha2:"su","alpha3-b":"sun","alpha3-t":null},{English:"Susu",French:"soussou",alpha2:null,"alpha3-b":"sus","alpha3-t":null},{English:"Sumerian",French:"sumérien",alpha2:null,"alpha3-b":"sux","alpha3-t":null},{English:"Swahili",French:"swahili",alpha2:"sw","alpha3-b":"swa","alpha3-t":null},{English:"Swedish",French:"suédois",alpha2:"sv","alpha3-b":"swe","alpha3-t":null},{English:"Classical Syriac",French:"syriaque classique",alpha2:null,"alpha3-b":"syc","alpha3-t":null},{English:"Syriac",French:"syriaque",alpha2:null,"alpha3-b":"syr","alpha3-t":null},{English:"Tahitian",French:"tahitien",alpha2:"ty","alpha3-b":"tah","alpha3-t":null},{English:"Tai languages",French:"tai, langues",alpha2:null,"alpha3-b":"tai","alpha3-t":null},{English:"Tamil",French:"tamoul",alpha2:"ta","alpha3-b":"tam","alpha3-t":null},{English:"Tatar",French:"tatar",alpha2:"tt","alpha3-b":"tat","alpha3-t":null},{English:"Telugu",French:"télougou",alpha2:"te","alpha3-b":"tel","alpha3-t":null},{English:"Timne",French:"temne",alpha2:null,"alpha3-b":"tem","alpha3-t":null},{English:"Tereno",French:"tereno",alpha2:null,"alpha3-b":"ter","alpha3-t":null},{English:"Tetum",French:"tetum",alpha2:null,"alpha3-b":"tet","alpha3-t":null},{English:"Tajik",French:"tadjik",alpha2:"tg","alpha3-b":"tgk","alpha3-t":null},{English:"Tagalog",French:"tagalog",alpha2:"tl","alpha3-b":"tgl","alpha3-t":null},{English:"Thai",French:"thaï",alpha2:"th","alpha3-b":"tha","alpha3-t":null},{English:"Tibetan",French:"tibétain",alpha2:"bo","alpha3-b":"tib","alpha3-t":"bod"},{English:"Tigre",French:"tigré",alpha2:null,"alpha3-b":"tig","alpha3-t":null},{English:"Tigrinya",French:"tigrigna",alpha2:"ti","alpha3-b":"tir","alpha3-t":null},{English:"Tiv",French:"tiv",alpha2:null,"alpha3-b":"tiv","alpha3-t":null},{English:"Tokelau",French:"tokelau",alpha2:null,"alpha3-b":"tkl","alpha3-t":null},{English:"Klingon; tlhIngan-Hol",French:"klingon",alpha2:null,"alpha3-b":"tlh","alpha3-t":null},{English:"Tlingit",French:"tlingit",alpha2:null,"alpha3-b":"tli","alpha3-t":null},{English:"Tamashek",French:"tamacheq",alpha2:null,"alpha3-b":"tmh","alpha3-t":null},{English:"Tonga (Nyasa)",French:"tonga (Nyasa)",alpha2:null,"alpha3-b":"tog","alpha3-t":null},{English:"Tonga (Tonga Islands)",French:"tongan (Îles Tonga)",alpha2:"to","alpha3-b":"ton","alpha3-t":null},{English:"Tok Pisin",French:"tok pisin",alpha2:null,"alpha3-b":"tpi","alpha3-t":null},{English:"Tsimshian",French:"tsimshian",alpha2:null,"alpha3-b":"tsi","alpha3-t":null},{English:"Tswana",French:"tswana",alpha2:"tn","alpha3-b":"tsn","alpha3-t":null},{English:"Tsonga",French:"tsonga",alpha2:"ts","alpha3-b":"tso","alpha3-t":null},{English:"Turkmen",French:"turkmène",alpha2:"tk","alpha3-b":"tuk","alpha3-t":null},{English:"Tumbuka",French:"tumbuka",alpha2:null,"alpha3-b":"tum","alpha3-t":null},{English:"Tupi languages",French:"tupi, langues",alpha2:null,"alpha3-b":"tup","alpha3-t":null},{English:"Turkish",French:"turc",alpha2:"tr","alpha3-b":"tur","alpha3-t":null},{English:"Altaic languages",French:"altaïques, langues",alpha2:null,"alpha3-b":"tut","alpha3-t":null},{English:"Tuvalu",French:"tuvalu",alpha2:null,"alpha3-b":"tvl","alpha3-t":null},{English:"Twi",French:"twi",alpha2:"tw","alpha3-b":"twi","alpha3-t":null},{English:"Tuvinian",French:"touva",alpha2:null,"alpha3-b":"tyv","alpha3-t":null},{English:"Udmurt",French:"oudmourte",alpha2:null,"alpha3-b":"udm","alpha3-t":null},{English:"Ugaritic",French:"ougaritique",alpha2:null,"alpha3-b":"uga","alpha3-t":null},{English:"Uighur; Uyghur",French:"ouïgour",alpha2:"ug","alpha3-b":"uig","alpha3-t":null},{English:"Ukrainian",French:"ukrainien",alpha2:"uk","alpha3-b":"ukr","alpha3-t":null},{English:"Umbundu",French:"umbundu",alpha2:null,"alpha3-b":"umb","alpha3-t":null},{English:"Undetermined",French:"indéterminée",alpha2:null,"alpha3-b":"und","alpha3-t":null},{English:"Urdu",French:"ourdou",alpha2:"ur","alpha3-b":"urd","alpha3-t":null},{English:"Uzbek",French:"ouszbek",alpha2:"uz","alpha3-b":"uzb","alpha3-t":null},{English:"Vai",French:"vaï",alpha2:null,"alpha3-b":"vai","alpha3-t":null},{English:"Venda",French:"venda",alpha2:"ve","alpha3-b":"ven","alpha3-t":null},{English:"Vietnamese",French:"vietnamien",alpha2:"vi","alpha3-b":"vie","alpha3-t":null},{English:"Volapük",French:"volapük",alpha2:"vo","alpha3-b":"vol","alpha3-t":null},{English:"Votic",French:"vote",alpha2:null,"alpha3-b":"vot","alpha3-t":null},{English:"Wakashan languages",French:"wakashanes, langues",alpha2:null,"alpha3-b":"wak","alpha3-t":null},{English:"Wolaitta; Wolaytta",French:"wolaitta; wolaytta",alpha2:null,"alpha3-b":"wal","alpha3-t":null},{English:"Waray",French:"waray",alpha2:null,"alpha3-b":"war","alpha3-t":null},{English:"Washo",French:"washo",alpha2:null,"alpha3-b":"was","alpha3-t":null},{English:"Welsh",French:"gallois",alpha2:"cy","alpha3-b":"wel","alpha3-t":"cym"},{English:"Sorbian languages",French:"sorabes, langues",alpha2:null,"alpha3-b":"wen","alpha3-t":null},{English:"Walloon",French:"wallon",alpha2:"wa","alpha3-b":"wln","alpha3-t":null},{English:"Wolof",French:"wolof",alpha2:"wo","alpha3-b":"wol","alpha3-t":null},{English:"Kalmyk; Oirat",French:"kalmouk; oïrat",alpha2:null,"alpha3-b":"xal","alpha3-t":null},{English:"Xhosa",French:"xhosa",alpha2:"xh","alpha3-b":"xho","alpha3-t":null},{English:"Yao",French:"yao",alpha2:null,"alpha3-b":"yao","alpha3-t":null},{English:"Yapese",French:"yapois",alpha2:null,"alpha3-b":"yap","alpha3-t":null},{English:"Yiddish",French:"yiddish",alpha2:"yi","alpha3-b":"yid","alpha3-t":null},{English:"Yoruba",French:"yoruba",alpha2:"yo","alpha3-b":"yor","alpha3-t":null},{English:"Yupik languages",French:"yupik, langues",alpha2:null,"alpha3-b":"ypk","alpha3-t":null},{English:"Zapotec",French:"zapotèque",alpha2:null,"alpha3-b":"zap","alpha3-t":null},{English:"Blissymbols; Blissymbolics; Bliss",French:"symboles Bliss; Bliss",alpha2:null,"alpha3-b":"zbl","alpha3-t":null},{English:"Zenaga",French:"zenaga",alpha2:null,"alpha3-b":"zen","alpha3-t":null},{English:"Standard Moroccan Tamazight",French:"amazighe standard marocain",alpha2:null,"alpha3-b":"zgh","alpha3-t":null},{English:"Zhuang; Chuang",French:"zhuang; chuang",alpha2:"za","alpha3-b":"zha","alpha3-t":null},{English:"Zande languages",French:"zandé, langues",alpha2:null,"alpha3-b":"znd","alpha3-t":null},{English:"Zulu",French:"zoulou",alpha2:"zu","alpha3-b":"zul","alpha3-t":null},{English:"Zuni",French:"zuni",alpha2:null,"alpha3-b":"zun","alpha3-t":null},{English:"No linguistic content; Not applicable",French:"pas de contenu linguistique; non applicable",alpha2:null,"alpha3-b":"zxx","alpha3-t":null},{English:"Zaza; Dimili; Dimli; Kirdki; Kirmanjki; Zazaki",French:"zaza; dimili; dimli; kirdki; kirmanjki; zazaki",alpha2:null,"alpha3-b":"zza","alpha3-t":null}];
/**
 * IsoLanguage
 *
 * A utility class representing ISO Language data.
 */class Ea{
/**
     * Creates a new instance of IsoLanguage.
     * @param nameOrCode The language name or ISO code.
     */
constructor(a){const l=a.toLocaleLowerCase().trim(),n=Fa.find((a=>{var n,h;return a.English.toLocaleLowerCase()===l||(null===(n=a.alpha2)||void 0===n?void 0:n.toLocaleLowerCase())===l||a["alpha3-b"].toLowerCase()===l||(null===(h=a["alpha3-t"])||void 0===h?void 0:h.toLocaleLowerCase())===l}));if(!n)
// no data found.
throw new ba;
// data is found.
this._name=n.English,this._alpha2=n.alpha2,this._alpha3b=n["alpha3-b"],this._alpha3t=n["alpha3-t"]}
/**
     * alpha2()
     *
     * Gets the alpha2 value.
     */alpha2(){return this._alpha2}
/**
     * alpha3b()
     *
     * gets the alpha3b value.
     */alpha3b(){return this._alpha3b}
/**
     * alpha3t()
     *
     * gets the alpha3t value.
     */alpha3t(){return this._alpha3t}
/**
     * equals()
     *
     * compares the instance to the subject to determine if they are equal.
     * @param suspect the suspect to compare.
     */equals(a){let l=!1;if(a instanceof Ea){const n=a;l=this.name()===n.name()&&this.alpha2()===n.alpha2()&&this.alpha3b()===n.alpha3b()&&this.alpha3t()===n.alpha3t()}return l}
/**
     * name()
     *
     * gets the language name.
     */name(){return this._name}toString(){return this.name()}}
/**
 * PhoneNumberException
 *
 * Indicates an error with a Phone Number.
 */class ma extends x{constructor(a="Phone Number Error"){super(a)}}
/**
 * PhoneNumber
 *
 * PhoneNumber represents a phone number.
 */class da{
/**
     * Creates a Phone Number instance.
     * @param value The phone number value.
     * @param regionCode The region code of the phone number.
     * @throws PhoneNumverException when the phone number is not valid.
     */
constructor(a,l){if(!a||!l)
// invlaid phone number.
throw new ma;
// make sure the phone number is valid.
if(this._phoneParser=z(a,{regionCode:l}),!this._phoneParser.valid)throw new ma}
/**
     * canBeInternationallyDialed()
     *
     * canBeInternationallyDialed() determines if the phone number can be internationally dialed.
     *
     * @returns TRUE if the number can be internationally dialed. Otherwise, it returns FALSE.
     */canBeInternationallyDialed(){return this._phoneParser.canBeInternationallyDialled}
/**
     * countryCode()
     *
     * countryCode() gets the phone number's country code.
     */countryCode(){return this._phoneParser.countryCode}
/**
     * equals()
     *
     * equals() compares the phone number to the suspect, to determine if they are equal.
     * @param suspect the suspect being confirmed.
     */equals(a){let l=!1;if(a instanceof da){const n=a;l=this.value()===n.value()}return l}
/**
     * e164()
     *
     * e164() gets the phone number in e164 format.
     */e164(){return this._phoneParser.number.e164}
/**
     * international()
     *
     * international() gets the international number.
     */international(){return this._phoneParser.number.international}
/**
     * isMobile()
     *
     * isMobile() determines if a phone number is mobile.
     */isMobile(){return this._phoneParser.typeIsMobile}
/**
     * national()
     *
     * national() gets the national phone number.
     */national(){return this._phoneParser.number.national}
/**
     * rfc3966()
     *
     * rfc3966() gets the rfc3966 number.
     */rfc3966(){return this._phoneParser.number.rfc3966}
/**
     * regionCode()
     *
     * regionCode() gets the phone number's region code.
     */regionCode(){return this._phoneParser.regionCode}
/**
     * significant()
     *
     * significant() gets the significant number of the phone number.
     */significant(){return this._phoneParser.number.significant}
/**
     * value()
     *
     * value() gets the phone number, in international format.
     */value(){return this.international()}toString(){return this.value()}}class ka{constructor(){

}
/**
     * sanitize()
     *
     * strips the HTML from a string.
     * @param dirty the string to sanitize.
     */sanitize(a){return _(a)}toString(){return`Instance of ${ka.name}`}}export{C as BaseException,ra as BaseFormatter,q as CharacterSet,L as Color,N as ColorException,W as Coordinates,Y as Country,O as CountryException,na as DateException,ea as DateTime,ia as Duration,ha as DurationException,ta as EmailAddress,sa as EmailAddressException,ka as HTMLSanitizer,P as Hash,M as Hex,T as HexException,ca as Id,pa as IdException,x as InvalidArgumentException,Ea as IsoLanguage,ba as IsoLanguageException,Q as Locality,Z as LocalityException,A as MethodUndefinedException,j as NetworkException,D as OutOfBoundsException,da as PhoneNumber,ma as PhoneNumberException,aa as PostalCode,U as PostalCodeException,I as RGBA,B as RGBAException,X as Region,R as RegionException,K as Salt,$ as Street,la as StreetAddress,G as StreetAddressException,H as StreetException,ua as StringFormatter,V as Timezone,J as TimezoneException,ga as UUID,oa as UUIDException};
