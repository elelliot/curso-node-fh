
//Ahora exportamos asi: cada app.js de este folder que se quede asi, que hueva renombrar todo
export const emailTemplate = `
<div>
  <h1>Hi, {{name}}</h1>
  <p>Thank you for your order.</p>
  <p>Order id: {{orderId}}</p>
</div>
`;

/*
Si queremos disponible la variable podemos exportarla.

De forma antigua:
module.exports = emailTemplate;

Aunque lo ideal seria hacerlo con un objecto mejor
*/
// module.exports = {
//   emailTemplate,
// };
