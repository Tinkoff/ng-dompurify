import {SafeValue} from '@angular/platform-browser';

export abstract class AbstractSafeValue implements SafeValue {
    constructor(private readonly value: string) {}

    abstract getTypeName(): string;

    get safeValue(): string {
        return this.value;
    }

    toString(): string {
        return (
            `SafeValue must use [property]=binding: ${this.value}` +
            ` (see http://g.co/ng/security#xss)`
        );
    }
}
