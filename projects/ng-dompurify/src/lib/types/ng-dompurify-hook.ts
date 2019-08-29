import {HookName} from 'dompurify';
import {DompurifyHook} from './dompurify-hook';

/**
 * A DOMPurify supported hook see {@link addHook}
 */
export type NgDompurifyHook = {
    readonly name: HookName;
    readonly hook: DompurifyHook;
};
