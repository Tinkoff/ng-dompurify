import {Component, Inject, SecurityContext} from '@angular/core';
import {DomSanitizer, SafeValue} from '@angular/platform-browser';

const dirtyHtml = `<p style="color: red; background: expression(evil)"> HELLO <iframe/\/src=JavaScript:alert&lpar;1)></ifrAMe><br>goodbye</p>`;

@Component({
    selector: 'app-pipe-example',
    templateUrl: './pipe-example.component.html',
})
export class PipeExampleComponent {
    value = dirtyHtml;

    constructor(@Inject(DomSanitizer) private readonly sanitizer: DomSanitizer) {}

    unwrap(value: SafeValue | null): string {
        return this.sanitizer.sanitize(SecurityContext.HTML, value) || '';
    }
}
