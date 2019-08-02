import {NgDompurifyPipe} from '../ng-dompurify.pipe';
import {dirtyHtml, cleanHtml} from './test-samples/html';
import {SafeHtmlImplementation} from '../safe-value/safe-html-implementation';
import {SafeStyleImplementation} from '../safe-value/safe-style-implementation';
import {SafeScriptImplementation} from '../safe-value/safe-script-implementation';
import {SecurityContext} from '@angular/core';
import {SafeUrlImplementation} from '../safe-value/safe-url-implementation';
import {SafeResourceUrlImplementation} from '../safe-value/safe-resource-url-implementation';
import {NgDompurifyDomSanitizer} from '../ng-dompurify-dom.service';
import {AbstractSafeValue} from '../safe-value/absctract-safe-value';

describe('NgDompurifyPipe', () => {
    const sanitizer = new NgDompurifyDomSanitizer({});
    let pipe: NgDompurifyPipe;

    beforeEach(() => {
        pipe = new NgDompurifyPipe(sanitizer);
    });

    it('transforms content to SafeValue with clean value', () => {
        const safeValue = pipe.transform(dirtyHtml) as AbstractSafeValue;

        expect(safeValue.safeValue).toBe(cleanHtml);
    });

    it('transforms content to SafeHTML', () => {
        const safeHTML = pipe.transform(dirtyHtml) as SafeHtmlImplementation;

        expect(safeHTML.getTypeName()).toBe('HTML');
    });

    it('transforms content to SafeStyle', () => {
        const safeStyle = pipe.transform(
            `test content`,
            SecurityContext.STYLE,
        ) as SafeStyleImplementation;

        expect(safeStyle.getTypeName()).toBe('Style');
    });

    it('transforms content to SafeScript', () => {
        const safeScript = pipe.transform(
            `test content`,
            SecurityContext.SCRIPT,
        ) as SafeScriptImplementation;

        expect(safeScript.getTypeName()).toBe('Script');
    });

    it('transforms content to SafeURL', () => {
        const safeURL = pipe.transform(
            `test content`,
            SecurityContext.URL,
        ) as SafeUrlImplementation;

        expect(safeURL.getTypeName()).toBe('URL');
    });

    it('transforms content to SafeResourceURL', () => {
        const safeResourceUrl = pipe.transform(
            `test content`,
            SecurityContext.RESOURCE_URL,
        ) as SafeResourceUrlImplementation;

        expect(safeResourceUrl.getTypeName()).toBe('ResourceURL');
    });

    it('transforms content to null by incorrect or NONE context', () => {
        const result = pipe.transform(`test content`, SecurityContext.NONE);

        expect(result).toBeNull();
    });
});
