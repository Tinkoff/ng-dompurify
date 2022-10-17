import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ServerModule} from '@angular/platform-server';
import {UNIVERSAL_PROVIDERS} from '@ng-web-apis/universal';

import {AppComponent} from './app.component';
import {AppModule} from './app.module';

@NgModule({
    imports: [
        AppModule,
        BrowserModule.withServerTransition({
            appId: 'ng-universal-demystified',
        }),
        ServerModule,
    ],
    bootstrap: [AppComponent],
    providers: UNIVERSAL_PROVIDERS,
})
export class AppServerModule {}
