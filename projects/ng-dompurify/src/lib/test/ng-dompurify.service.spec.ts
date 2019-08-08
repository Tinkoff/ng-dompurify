import {NgDompurifySanitizer} from '../ng-dompurify.service';
import {cleanHtml, dirtyHtml} from './test-samples/html';
import {SecurityContext} from '@angular/core';
import {dirtyUrl, cleanUrl} from './test-samples/url';
import {TestBed} from '@angular/core/testing';

describe('NgDompurifySanitizer', () => {
    let service: NgDompurifySanitizer;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [NgDompurifySanitizer],
        });

        service = TestBed.get(NgDompurifySanitizer);
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

    it('should sanitize styles in DIV by default', () => {
        const html = `<div style="bad">test</div>`;
        const sanitized = service.sanitize(SecurityContext.URL, html);

        expect(sanitized).toBe(`<div>test</div>`);
    });
});
