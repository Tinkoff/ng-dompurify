import {SanitizeStyle} from '../types/sanitize-style';

/**
 *  Take CSS property-value pairs and validate them through provided method,
 *  then add the styles to an array of property-value pairs
 */
export function validateStyles(
    styles: CSSStyleDeclaration,
    sanitizeStyle: SanitizeStyle,
): ReadonlyArray<string> {
    const output: string[] = [];
    const {length} = styles;

    for (let i = 0; i < length; i++) {
        const propertyName = styles.item(i);
        const propertyValue = styles.getPropertyValue(propertyName);
        const sanitized = sanitizeStyle(propertyValue);

        if (sanitized) {
            output.push(`${propertyName}:${sanitized};`);
        }
    }

    return output;
}
