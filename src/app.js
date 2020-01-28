const express = require('express');
const routes = require('./routes');
const app = express();
let reqCount = 0;

app.use(express.json());
app.use((req, res, next) => {
  console.log(`A contagem de requisições é: ${reqCount++}`);
  return next();
});
app.use(routes);

app.listen(3333);
