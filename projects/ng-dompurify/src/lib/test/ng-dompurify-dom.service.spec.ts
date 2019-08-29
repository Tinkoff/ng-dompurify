import {cleanHtml, dirtyHtml} from './test-samples/html';
import {SecurityContext} from '@angular/core';
import {dirtyUrl, cleanUrl} from './test-samples/url';
import {NgDompurifyDomSanitizer} from '../ng-dompurify-dom.service';
import {SafeHtmlImplementation} from '../safe-value/safe-html-implementation';
import {AbstractSafeValue} from '../safe-value/absctract-safe-value';
import {SafeStyleImplementation} from '../safe-value/safe-style-implementation';
import {SafeScriptImplementation} from '../safe-value/safe-script-implementation';
import {SafeResourceUrlImplementation} from '../safe-value/safe-resource-url-implementation';
import {SafeUrlImplementation} from '../safe-value/safe-url-implementation';
import {TestBed} from '@angular/core/testing';
import {sanitizeStyle} from './test-samples/sanitizeStyle';
import {SANITIZE_STYLE} from '../tokens/sanitize-style';
import {cleanStyle, dirtyStyle} from './test-samples/style';
import {removeAllHooks} from 'dompurify';

describe('NgDompurifyDomSanitizer', () => {
    let service: NgDompurifyDomSanitizer;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: SANITIZE_STYLE,
                    useValue: sanitizeStyle,
                },
                NgDompurifyDomSanitizer,
            ],
        });

        service = TestBed.get(NgDompurifyDomSanitizer);
    });

    afterEach(() => {
        removeAllHooks();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should sanitize HTML', () => {
        const sanitized = service.sanitize(SecurityContext.HTML, dirtyHtml);

        expect(sanitized).toBe(cleanHtml);
    });

    it('should sanitize URL', () => {
        const sanitized = service.sanitize(SecurityContext.URL, dirtyUrl);

        expect(sanitized).toBe(cleanUrl);
    });

    it('returns null by NONE or incorrect context', () => {
        const sanitized = service.sanitize(SecurityContext.NONE, dirtyUrl);

        expect(sanitized).toBeNull();
    });

    it('throws error by using STYLE security context', () => {
        const sanitized = service.sanitize(SecurityContext.STYLE, dirtyStyle);

        expect(sanitized).toBe(cleanStyle);
    });

    it('throws error by using SCRIPT security context', done => {
        try {
            service.sanitize(SecurityContext.SCRIPT, dirtyUrl);
        } catch (error) {
            expect(error).toBeTruthy();
            done();
        }
    });

    describe('can make trusted', () => {
        const testContent = `test value`;

        it('string due wrapping into safe value', () => {
            const safeHtml = service.bypassSecurityTrustHtml(
                testContent,
            ) as SafeHtmlImplementation;

            expect(safeHtml instanceof AbstractSafeValue).toBeTruthy();
        });

        it('string that contains safeValue with ', () => {
            const safeHtml = service.bypassSecurityTrustHtml(
                testContent,
            ) as SafeHtmlImplementation;

            expect(safeHtml.safeValue).toBe(testContent);
        });

        it('HTML', () => {
            const safeHtml = service.bypassSecurityTrustHtml(
                testContent,
            ) as SafeHtmlImplementation;

            expect(safeHtml.getTypeName()).toBe('HTML');
        });

        it('Style', () => {
            const safeStyle = service.bypassSecurityTrustStyle(
                testContent,
            ) as SafeStyleImplementation;

            expect(safeStyle.getTypeName()).toBe('Style');
        });

        it('Script', () => {
            const safeScript = service.bypassSecurityTrustScript(
                testContent,
            ) as SafeScriptImplementation;

            expect(safeScript.getTypeName()).toBe('Script');
        });

        it('URL', () => {
            const safeURL = service.bypassSecurityTrustUrl(
                testContent,
            ) as SafeUrlImplementation;

            expect(safeURL.getTypeName()).toBe('URL');
        });

        it('Resource URL', () => {
            const safeResourceUrl = service.bypassSecurityTrustResourceUrl(
                testContent,
            ) as SafeResourceUrlImplementation;

            expect(safeResourceUrl.getTypeName()).toBe('ResourceURL');
        });
    });

    it('returns value of SafeValue', () => {
        const safeHtml = service.bypassSecurityTrustHtml(
            dirtyHtml,
        ) as SafeHtmlImplementation;

        const sanitized = service.sanitize(SecurityContext.HTML, safeHtml);

        expect(sanitized).toBe(dirtyHtml);
    });

    it('safeValue can be stringified', () => {
        const safeHtml = service.bypassSecurityTrustHtml(
            `test`,
        ) as SafeHtmlImplementation;

        const stringified = String(safeHtml);

        expect(stringified).toBe(
            `SafeValue must use [property]=binding: test (see http://g.co/ng/security#xss)`,
        );
    });
});
