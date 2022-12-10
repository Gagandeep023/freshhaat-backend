const express = require('express');
const port = 3500;
const db = require("./models");
const passport = require('passport');

const app = express();
var cors = require('cors');

require('./config/passport')(passport);
app.use(passport.initialize());


app.use(cors())

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(require('./routes')); 


db.sequelize.sync().then((req) => {
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
});
