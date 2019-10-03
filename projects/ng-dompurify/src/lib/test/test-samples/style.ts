export const dirtyStyle = 'expression(evil)';
export const cleanStyle = '';
export const dirtyStyleTag =
    '<br><style>@import "malicious.css"; .red {color: red; background: expression(evil)}</style>';
export const cleanStyleTag = '<br><style>.red{\ncolor:red;\n}</style>';
