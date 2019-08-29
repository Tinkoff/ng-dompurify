import {SafeStyle} from '@angular/platform-browser';
import {AbstractSafeValue} from './absctract-safe-value';

export class SafeStyleImplementation extends AbstractSafeValue implements SafeStyle {
    getTypeName(): string {
        return 'Style';
    }
}
