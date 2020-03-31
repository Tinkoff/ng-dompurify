import {Inject, Pipe, PipeTransform, SecurityContext} from '@angular/core';
import {DomSanitizer, SafeValue} from '@angular/platform-browser';
import {NgDompurifySanitizer} from './ng-dompurify.service';
import {DOMPURIFY_CONFIG} from './tokens/dompurify-config';
import {NgDompurifyConfig} from './types/ng-dompurify-config';

/**
 * Pipe that transforms dirty content to clean via {@link NgDompurifySanitizer}
 */
@Pipe({name: 'dompurify'})
export class NgDompurifyPipe implements PipeTransform {
    constructor(
        @Inject(DOMPURIFY_CONFIG)
        private readonly config: NgDompurifyConfig,
        private readonly sanitizer: NgDompurifySanitizer,
        private readonly domSanitizer: DomSanitizer,
    ) {}

    transform(
        value: {} | string | null,
        context: SecurityContext = SecurityContext.HTML,
        config: NgDompurifyConfig = this.config,
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
            case SecurityContext.URL:
                return this.domSanitizer.bypassSecurityTrustUrl(purifiedValue);
            case SecurityContext.RESOURCE_URL:
                return this.domSanitizer.bypassSecurityTrustResourceUrl(purifiedValue);
            default:
                return null;
        }
    }
}
