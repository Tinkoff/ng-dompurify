import {Injectable, SecurityContext} from '@angular/core';
import {
    DomSanitizer,
    SafeHtml,
    SafeResourceUrl,
    SafeScript,
    SafeStyle,
    SafeUrl,
    SafeValue,
} from '@angular/platform-browser';
import {NgDompurifySanitizer} from './ng-dompurify.service';
import {AbstractSafeValue} from './safe-value/absctract-safe-value';
import {SafeHtmlImplementation} from './safe-value/safe-html-implementation';
import {SafeResourceUrlImplementation} from './safe-value/safe-resource-url-implementation';
import {SafeScriptImplementation} from './safe-value/safe-script-implementation';
import {SafeStyleImplementation} from './safe-value/safe-style-implementation';
import {SafeUrlImplementation} from './safe-value/safe-url-implementation';

/**
 * Implementation of Angular {@link DomSanitizer} purifying via DOMPurify and {@link NgDompurifySanitizer}
 */
@Injectable()
export class NgDompurifyDomSanitizer extends DomSanitizer {
    constructor(private readonly sanitizer: NgDompurifySanitizer) {
        super();
    }

    sanitize(context: SecurityContext, value: SafeValue | string | null): string | null {
        switch (context) {
            case SecurityContext.SCRIPT:
            case SecurityContext.STYLE:
            case SecurityContext.HTML:
            case SecurityContext.URL:
            case SecurityContext.RESOURCE_URL:
                return this.sanitizeSupportedValue(context, value);
            default:
                return null;
        }
    }

    bypassSecurityTrustHtml(value: string): SafeHtml {
        return new SafeHtmlImplementation(value);
    }

    bypassSecurityTrustStyle(value: string): SafeStyle {
        return new SafeStyleImplementation(value);
    }

    bypassSecurityTrustScript(value: string): SafeScript {
        return new SafeScriptImplementation(value);
    }

    bypassSecurityTrustUrl(value: string): SafeUrl {
        return new SafeUrlImplementation(value);
    }

    bypassSecurityTrustResourceUrl(value: string): SafeResourceUrl {
        return new SafeResourceUrlImplementation(value);
    }

    private sanitizeSupportedValue(
        context: SecurityContext,
        value: SafeValue | string | null,
    ): string {
        return value instanceof AbstractSafeValue
            ? value.safeValue
            : this.sanitizer.sanitize(context, value);
    }
}
