import './polyfills';

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then(ref => {
        // Ensure Angular destroys itself on hot reloads for Stackblitz
        const windowRef: any = window;

        if (windowRef['ngRef']) {
            windowRef['ngRef'].destroy();
        }

        windowRef['ngRef'] = ref;
    })
    .catch(err => console.error(err));
