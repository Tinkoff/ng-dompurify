import {Pipe, PipeTransform, SecurityContext} from '@angular/core';
import {DomSanitizer, SafeValue} from '@angular/platform-browser';
import {purify} from './purify';
import {NgDompurifyConfig} from './types/ng-dompurify-config';
import {NGDOMPURIFY_DEFAULT_CONFIG} from './const/default-config';

/**
 * Pipe that transforms dirty HTML to clean via {@link purify}
 */
@Pipe({name: 'dompurify'})
export class NgDompurifyPipe implements PipeTransform {
    constructor(private readonly domSanitizer: DomSanitizer) {}

    transform(
        value: {} | string | null,
        context: SecurityContext = SecurityContext.HTML,
        config: NgDompurifyConfig = NGDOMPURIFY_DEFAULT_CONFIG,
    ): SafeValue | null {
        const sanitizedValue = purify(value, config);

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
