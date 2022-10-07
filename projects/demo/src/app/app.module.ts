import {NgModule, Sanitizer} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {NgDompurifyModule, NgDompurifySanitizer} from '@tinkoff/ng-dompurify';

import {AppComponent} from './app.component';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, NgDompurifyModule],
    providers: [
        {
            provide: Sanitizer,
            useClass: NgDompurifySanitizer,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
