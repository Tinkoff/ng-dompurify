import {AbstractSafeValue} from './absctract-safe-value';
import {SafeResourceUrl} from '@angular/platform-browser';

export class SafeResourceUrlImplementation extends AbstractSafeValue
    implements SafeResourceUrl {
    getTypeName(): string {
        return 'ResourceURL';
    }
}
