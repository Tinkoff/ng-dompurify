import {SafeScript} from '@angular/platform-browser';
import {AbstractSafeValue} from './absctract-safe-value';

export class SafeScriptImplementation extends AbstractSafeValue implements SafeScript {
    getTypeName(): string {
        return 'Script';
    }
}
