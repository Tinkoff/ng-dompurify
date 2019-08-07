import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgDompurifyDomSanitizer, NgDompurifyModule} from '@tinkoff/ng-dompurify';
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
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
