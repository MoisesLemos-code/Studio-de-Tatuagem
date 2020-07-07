const express = require('express');
const routes = require('./routes');
const mongoose = require("mongoose");
const path = require("path");

require('./database')

const app = express();

mongoose.connect(
  'mongodb://localhost:27017/studioTattoo',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/fotos', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(routes);
app.listen(3333);
