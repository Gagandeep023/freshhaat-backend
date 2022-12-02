// const express = require('express');
// const port = 3000;
// const dashboard = require('./route/dashboard');
// const db = require('./models');

// const app = express();

// // (async () => {
// //   await db.sequelize.sync();
// // })();

// app.use(express.json());
// app.use('/api/v1/dashboard', dashboard);

// app.listen(port, () => {
//   console.log(`Server listening at http://localhost:${port}`);
// });

const express = require('express');
const port = 3001;
const dashboard = require('./route/dashboard');

const app = express();
var cors = require('cors')

app.use(cors())
app.use(express.json());
app.use('/api/v1/dashboard', dashboard);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});