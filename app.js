const express = require('express');
const port = 3500;
const db = require("./models");
const passport = require('passport');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const credentials = require('./middleware/credentials');
const { logger } = require('./middleware/logEvents');

const app = express();

require('./config/passport')(passport);
app.use(passport.initialize());

app.use(logger);

app.use(credentials);

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(require('./routes')); 


db.sequelize.sync().then((req) => {
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
});
