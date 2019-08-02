import {AbstractSafeValue} from './absctract-safe-value';
import {SafeScript} from '@angular/platform-browser';

export class SafeScriptImplementation extends AbstractSafeValue implements SafeScript {
    getTypeName(): string {
        return 'Script';
    }
}
