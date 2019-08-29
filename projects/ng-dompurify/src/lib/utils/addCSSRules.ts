import {SanitizeStyle} from '../types/sanitize-style';
import {isSelectorRule} from './isSelectorRule';
import {validateStyles} from './validateStyles';

/**
 * Take CSS rules and analyze them, create string wrapper to
 * apply them to the DOM later on. Note that only selector rules
 * are supported right now
 */
export function addCSSRules(
    cssRules: CSSRuleList,
    sanitizeStyle: SanitizeStyle,
): ReadonlyArray<string> {
    const output: string[] = [];

    for (let index = cssRules.length - 1; index >= 0; index--) {
        const rule = cssRules[index];

        if (isSelectorRule(rule)) {
            output.push(
                rule.selectorText + '{',
                ...validateStyles(rule.style, sanitizeStyle),
                '}',
            );
        }
    }

    return output;
}
