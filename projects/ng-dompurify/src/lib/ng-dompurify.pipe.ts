import {Pipe, PipeTransform, SecurityContext} from '@angular/core';
import {DomSanitizer, SafeValue} from '@angular/platform-browser';
import {NgDompurifyConfig} from './types/ng-dompurify-config';
import {NGDOMPURIFY_DEFAULT_CONFIG} from './const/default-config';
import {NgDompurifySanitizer} from './ng-dompurify.service';

/**
 * Pipe that transforms dirty HTML to clean via {@link NgDompurifySanitizer}
 */
@Pipe({name: 'dompurify'})
export class NgDompurifyPipe implements PipeTransform {
    constructor(
        private readonly sanitizer: NgDompurifySanitizer,
        private readonly domSanitizer: DomSanitizer,
    ) {}

    transform(
        value: {} | string | null,
        context: SecurityContext = SecurityContext.HTML,
        config: NgDompurifyConfig = NGDOMPURIFY_DEFAULT_CONFIG,
    ): SafeValue | null {
        const sanitizedValue = this.sanitizer.sanitize(context, value, config);

        return this.bypassSecurityTrust(context, sanitizedValue);
    }

    private bypassSecurityTrust(
        context: SecurityContext,
        purifiedValue: string,
    ): SafeValue | null {
        switch (context) {
            case SecurityContext.HTML:
                return this.domSanitizer.bypassSecurityTrustHtml(purifiedValue);
            case SecurityContext.STYLE:
                return this.domSanitizer.bypassSecurityTrustStyle(purifiedValue);
            case SecurityContext.SCRIPT:
                return this.domSanitizer.bypassSecurityTrustScript(purifiedValue);
            case SecurityContext.URL:
                return this.domSanitizer.bypassSecurityTrustUrl(purifiedValue);
            case SecurityContext.RESOURCE_URL:
                return this.domSanitizer.bypassSecurityTrustResourceUrl(purifiedValue);
            default:
                return null;
        }
    }
}
