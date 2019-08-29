import {SafeHtml} from '@angular/platform-browser';
import {AbstractSafeValue} from './absctract-safe-value';

export class SafeHtmlImplementation extends AbstractSafeValue implements SafeHtml {
    getTypeName(): string {
        return 'HTML';
    }
}
