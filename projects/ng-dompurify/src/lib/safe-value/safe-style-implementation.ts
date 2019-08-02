import {AbstractSafeValue} from './absctract-safe-value';
import {SafeStyle} from '@angular/platform-browser';

export class SafeStyleImplementation extends AbstractSafeValue implements SafeStyle {
    getTypeName(): string {
        return 'Style';
    }
}
