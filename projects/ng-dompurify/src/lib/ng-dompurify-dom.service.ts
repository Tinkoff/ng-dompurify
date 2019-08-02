import {Injectable, SecurityContext, Inject} from '@angular/core';
import {
    DomSanitizer,
    SafeHtml,
    SafeStyle,
    SafeScript,
    SafeUrl,
    SafeResourceUrl,
    SafeValue,
} from '@angular/platform-browser';
import {SafeHtmlImplementation} from './safe-value/safe-html-implementation';
import {SafeStyleImplementation} from './safe-value/safe-style-implementation';
import {SafeScriptImplementation} from './safe-value/safe-script-implementation';
import {SafeUrlImplementation} from './safe-value/safe-url-implementation';
import {SafeResourceUrlImplementation} from './safe-value/safe-resource-url-implementation';
import {purify} from './purify';
import {AbstractSafeValue} from './safe-value/absctract-safe-value';
import {DOMPURIFY_CONFIG} from './const/dompurify-config';
import {NgDompurifyConfig} from './types/ng-dompurify-config';

/**
 * Implementation of Angular {@link DomSanitizer} purifying via dompurify
 *
 * use {@link DOMPURIFY_CONFIG} token to provide config ({@link NgDompurifyConfig})
 */
@Injectable()
export class NgDompurifyDomSanitizer extends DomSanitizer {
    constructor(
        @Inject(DOMPURIFY_CONFIG)
        private readonly config: NgDompurifyConfig,
    ) {
        super();
    }

    sanitize(context: SecurityContext, value: SafeValue | string | null): string | null {
        switch (context) {
            case SecurityContext.SCRIPT:
            case SecurityContext.STYLE:
                throw new Error('dompurify supports HTML, URL and RESOURSE_URL contexts');
            case SecurityContext.HTML:
            case SecurityContext.URL:
            case SecurityContext.RESOURCE_URL:
                return this.sanitizeSupportedValue(value);
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

    private sanitizeSupportedValue(value: SafeValue | string | null): string {
        if (value instanceof AbstractSafeValue) {
            return value.safeValue;
        }

        return purify(value, this.config);
    }
}
