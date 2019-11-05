import {SanitizeStyle} from '../../types/sanitize-style';

export const sanitizeStyle: SanitizeStyle = style => (style.includes('(') ? '' : style);
