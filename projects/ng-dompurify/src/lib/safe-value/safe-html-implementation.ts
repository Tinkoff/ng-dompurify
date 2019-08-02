import {AbstractSafeValue} from './absctract-safe-value';
import {SafeHtml} from '@angular/platform-browser';

export class SafeHtmlImplementation extends AbstractSafeValue implements SafeHtml {
    getTypeName(): string {
        return 'HTML';
    }
}
