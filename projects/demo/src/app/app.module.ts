import {NgModule, ɵ_sanitizeStyle} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
import {
    NgDompurifyDomSanitizer,
    NgDompurifyModule,
    SANITIZE_STYLE,
} from '@tinkoff/ng-dompurify';
import {AppComponent} from './app.component';
import {PipeExampleComponent} from './pipe-example/pipe-example.component';
import {SanitizerExampleComponent} from './sanitizer-example/sanitizer-example.component';

@NgModule({
    declarations: [AppComponent, PipeExampleComponent, SanitizerExampleComponent],
    imports: [BrowserModule, FormsModule, NgDompurifyModule],
    providers: [
        {
            provide: DomSanitizer,
            useClass: NgDompurifyDomSanitizer,
        },
        {
            provide: SANITIZE_STYLE,
            useValue: ɵ_sanitizeStyle,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
