import {Config, HookEvent} from 'dompurify';

/**
 * DOMPurify hook function {@link addHook}
 */
export type DompurifyHook = (
    currentNode: Element,
    data: HookEvent,
    config: Config,
) => void;
