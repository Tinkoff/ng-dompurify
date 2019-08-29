import {CommonModule} from '@angular/common';
import {Component, ElementRef, SecurityContext, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {removeAllHooks} from 'dompurify';
import {NgDompurifyModule} from '../ng-dompurify.module';
import {SANITIZE_STYLE} from '../tokens/sanitize-style';
import {cleanHtml, dirtyHtml} from './test-samples/html';
import {sanitizeStyle} from './test-samples/sanitizeStyle';
import {cleanUrl, dirtyUrl} from './test-samples/url';

describe('NgDompurifyPipe', () => {
    @Component({
        template: `
            <div #element *ngIf="html" [innerHTML]="content | dompurify: context:config">
                test
            </div>
            <div
                #element
                *ngIf="style"
                [style.color]="content | dompurify: context:config"
            ></div>
            <img
                #element
                *ngIf="url"
                alt=""
                [src]="content | dompurify: context:config"
            />
        `,
    })
    class TestComponent {
        content = '';
        context?: SecurityContext = SecurityContext.HTML;
        config? = {};

        @ViewChild('element', {static: false})
        readonly element!: ElementRef<HTMLElement>;

        get html(): boolean {
            return (
                this.context === undefined ||
                this.context === SecurityContext.HTML ||
                this.context === SecurityContext.SCRIPT ||
                this.context === SecurityContext.NONE
            );
        }

        get style(): boolean {
            return this.context === SecurityContext.STYLE;
        }

        get url(): boolean {
            return (
                this.context === SecurityContext.URL ||
                this.context === SecurityContext.RESOURCE_URL
            );
        }
    }

    let fixture: ComponentFixture<TestComponent>;
    let testComponent: TestComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, NgDompurifyModule],
            declarations: [TestComponent],
            providers: [
                {
                    provide: SANITIZE_STYLE,
                    useValue: sanitizeStyle,
                },
            ],
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        removeAllHooks();
    });

    it('sanitizes HTML', () => {
        testComponent.content = dirtyHtml;
        fixture.detectChanges();

        expect(testComponent.element.nativeElement.innerHTML).toBe(cleanHtml);
    });

    it('sanitizes HTML by default', () => {
        testComponent.content = dirtyHtml;
        testComponent.context = undefined;
        testComponent.config = undefined;
        fixture.detectChanges();

        expect(testComponent.element.nativeElement.innerHTML).toBe(cleanHtml);
    });

    it('sanitizes HTML with config', () => {
        testComponent.content = dirtyHtml;
        testComponent.config = {FORBID_TAGS: ['br']};
        fixture.detectChanges();

        expect(testComponent.element.nativeElement.innerHTML).toBe(
            cleanHtml.replace('<br>', ''),
        );
    });

    it('sanitizes URL', () => {
        testComponent.content = dirtyUrl;
        testComponent.context = SecurityContext.URL;
        fixture.detectChanges();

        expect(testComponent.element.nativeElement.getAttribute('src')).toBe(cleanUrl);
    });

    it('sanitizes RESOURCE URL', () => {
        testComponent.content = dirtyUrl;
        testComponent.context = SecurityContext.RESOURCE_URL;
        fixture.detectChanges();

        expect(testComponent.element.nativeElement.getAttribute('src')).toBe(cleanUrl);
    });

    it('sanitizes STYLE', () => {
        testComponent.content = 'some style';
        testComponent.context = SecurityContext.STYLE;
        fixture.detectChanges();

        expect(testComponent.element.nativeElement.getAttribute('style')).toBe(null);
    });

    it('throws error by using SCRIPT security context', done => {
        try {
            testComponent.context = SecurityContext.SCRIPT;
            fixture.detectChanges();
        } catch (error) {
            expect(error).toBeTruthy();
            done();
        }
    });

    it('clears content when used with NONE context', () => {
        testComponent.content = dirtyHtml;
        testComponent.context = SecurityContext.NONE;
        fixture.detectChanges();

        expect(testComponent.element.nativeElement.innerHTML).toBe('');
    });
});
