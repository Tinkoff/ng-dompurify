import {AbstractSafeValue} from './absctract-safe-value';
import {SafeUrl} from '@angular/platform-browser';

export class SafeUrlImplementation extends AbstractSafeValue implements SafeUrl {
    getTypeName(): string {
        return 'URL';
    }
}
