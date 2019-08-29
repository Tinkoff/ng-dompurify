import {SafeResourceUrl} from '@angular/platform-browser';
import {AbstractSafeValue} from './absctract-safe-value';

export class SafeResourceUrlImplementation extends AbstractSafeValue
    implements SafeResourceUrl {
    getTypeName(): string {
        return 'ResourceURL';
    }
}
