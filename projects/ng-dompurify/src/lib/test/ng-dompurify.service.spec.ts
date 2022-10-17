import {APP_BASE_HREF} from '@angular/common';
import {SecurityContext} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {removeAllHooks} from 'dompurify';

import {NgDompurifySanitizer} from '../ng-dompurify.service';
import {DOMPURIFY_HOOKS} from '../tokens/dompurify-hooks';
import {SANITIZE_STYLE} from '../tokens/sanitize-style';
import {NgDompurifyHook} from '../types/ng-dompurify-hook';
import {cleanHtml, dirtyHtml} from './test-samples/html';
import {sanitizeStyle} from './test-samples/sanitizeStyle';
import {cleanUrl, dirtyUrl} from './test-samples/url';

describe('NgDompurifySanitizer', () => {
    const hooks: readonly NgDompurifyHook[] = [
        {
            name: 'beforeSanitizeAttributes',
            hook: (node: Element) => {
                if (node instanceof HTMLElement) {
                    node.removeAttribute('id');
                }
            },
        },
    ];
    let service: NgDompurifySanitizer;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: SANITIZE_STYLE,
                    useValue: sanitizeStyle,
                },
                {
                    provide: DOMPURIFY_HOOKS,
                    useValue: hooks,
                },
                NgDompurifySanitizer,
                {
                    provide: APP_BASE_HREF,
                    useValue: '/',
                },
            ],
        });

        service = TestBed.get(NgDompurifySanitizer);
    });

    afterEach(() => {
        removeAllHooks();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should work with null value', () => {
        const sanitized = service.sanitize(SecurityContext.HTML, null);

        expect(sanitized).toBe('');
    });

    it('should sanitize HTML', () => {
        const sanitized = service.sanitize(SecurityContext.HTML, dirtyHtml);

        expect(sanitized).toBe(cleanHtml);
    });

    it('should sanitize URL', () => {
        const sanitized = service.sanitize(SecurityContext.URL, dirtyUrl);

        expect(sanitized).toBe(cleanUrl);
    });

    it('should sanitize styles', () => {
        expect(service.sanitize(SecurityContext.STYLE, 'test')).toBe(`test`);
        expect(service.sanitize(SecurityContext.STYLE, '(test)')).toBe(``);
    });

    it('hooks should work', () => {
        const html = `<div id="test">test</div>`;
        const sanitized = service.sanitize(SecurityContext.HTML, html);

        expect(sanitized).toBe(`<div>test</div>`);
    });
});

describe('NgDompurifySanitizer default DI', () => {
    let service: NgDompurifySanitizer;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                NgDompurifySanitizer,
                {
                    provide: APP_BASE_HREF,
                    useValue: '/',
                },
            ],
        });

        service = TestBed.get(NgDompurifySanitizer);
    });

    afterEach(() => {
        removeAllHooks();
    });

    it('does not sanitize styles by default', () => {
        expect(service.sanitize(SecurityContext.STYLE, '(test)')).toBe('(test)');
    });
});
