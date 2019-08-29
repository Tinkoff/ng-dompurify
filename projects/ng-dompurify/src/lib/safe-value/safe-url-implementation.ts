import {SafeUrl} from '@angular/platform-browser';
import {AbstractSafeValue} from './absctract-safe-value';

export class SafeUrlImplementation extends AbstractSafeValue implements SafeUrl {
    getTypeName(): string {
        return 'URL';
    }
}
