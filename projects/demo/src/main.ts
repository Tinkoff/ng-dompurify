import './polyfills';

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then(ref => {
        // Ensure Angular destroys itself on hot reloads for Stackblitz
        if (window['ngRef']) {
            window['ngRef'].destroy();
        }

        window['ngRef'] = ref;
    })
    .catch(err => console.error(err));
