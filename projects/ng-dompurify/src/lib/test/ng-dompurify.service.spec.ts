import {SecurityContext} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {removeAllHooks} from 'dompurify';
import {NgDompurifySanitizer} from '../ng-dompurify.service';
import {DOMPURIFY_HOOKS} from '../tokens/dompurify-hooks';
import {SANITIZE_STYLE} from '../tokens/sanitize-style';
import {NgDompurifyHooks} from '../types/ng-dompurify-hooks';
import {cleanHtml, dirtyHtml} from './test-samples/html';
import {sanitizeStyle} from './test-samples/sanitizeStyle';
import {cleanStyleTag, dirtyStyleTag} from './test-samples/style';
import {cleanUrl, dirtyUrl} from './test-samples/url';

describe('NgDompurifySanitizer', () => {
    const hooks: NgDompurifyHooks = [
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
        const html = `<div style="background-image: url(evil);">test</div>`;
        const sanitized = service.sanitize(SecurityContext.HTML, html);

        expect(sanitized).toBe(`<div>test</div>`);
    });

    it('should sanitize entire style tag', () => {
        const sanitized = service.sanitize(SecurityContext.HTML, dirtyStyleTag);

        expect(sanitized).toBe(cleanStyleTag);
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
            providers: [NgDompurifySanitizer],
        });

        service = TestBed.get(NgDompurifySanitizer);
    });

    afterEach(() => {
        removeAllHooks();
    });

    it('sanitizes styles into nothing by default', () => {
        expect(service.sanitize(SecurityContext.STYLE, 'test')).toBe('');
    });
});
