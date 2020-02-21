export const dirtyHtml = `<p style="color: red; background-image: url('evil')">HELLO<iframe/\/src=JavaScript:alert&lpar;1)></ifrAMe><br>goodbye</p><style>*{x:expression(alert(1), color: red)}</style><svg><circle style="x:expression(alert(1))" /></svg>`;
export const cleanHtml = `<p style="color:red;">HELLO<br>goodbye</p><style>*{
}</style><svg><circle></circle></svg>`;
