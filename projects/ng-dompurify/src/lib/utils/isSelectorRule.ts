/**
 * Checks CSSRule for basic CSSStyleRule selector rule
 */
export function isSelectorRule(rule: CSSRule): rule is CSSStyleRule {
    return (
        rule.type === CSSRule.STYLE_RULE &&
        rule instanceof CSSStyleRule &&
        !!rule.selectorText
    );
}
