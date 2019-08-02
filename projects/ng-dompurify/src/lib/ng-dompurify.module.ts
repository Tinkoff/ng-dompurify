import {NgModule} from '@angular/core';
import {NgDompurifyPipe} from './ng-dompurify.pipe';

@NgModule({
    declarations: [NgDompurifyPipe],
    exports: [NgDompurifyPipe],
})
export class NgDompurifyModule {}
