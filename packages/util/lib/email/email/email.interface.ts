/**
 * EmailInterface
 *
 * EmailInterface defines the interface for an email address.
 */

export interface EmailInterface {

    /**
     * domainName
     * 
     * gets the domain of the email address.
     */

    readonly domainName: string;

    /**
     * username
     * 
     * gets the username of the email address.
     */

    readonly username: string;

    /**
     * value
     *
     * gets the value of the email.
     */

    readonly value: string;
}