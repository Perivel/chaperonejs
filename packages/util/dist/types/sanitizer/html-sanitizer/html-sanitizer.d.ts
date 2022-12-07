import { HTMLSanitizerInterface } from "./html-sanitizer.interface";
export declare class HTMLSanitizer implements HTMLSanitizerInterface {
    constructor();
    /**
     * sanitize()
     *
     * strips the HTML from a string.
     * @param dirty the string to sanitize.
     */
    sanitize(dirty: string): string;
    toString(): string;
}
//# sourceMappingURL=html-sanitizer.d.ts.map