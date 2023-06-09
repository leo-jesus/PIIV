// Pacotes que vamos utilizar
const compression = require("compression");
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

//start
const app = express();

// variáveis do ambiente

const isProduction = process.env.NODE_ENV === "production";

const PORT = process.env.PORT || 3000;

//arquivos estáticos

app.use("/public", express.static(__dirname + "/public"));
app.use("/public/images", express.static(__dirname + "/public/images"));

//setup mongoDB

const dbs = require("./config/database");
const dbURI = isProduction ? dbs.dbProduction : dbs.dbTest;
mongoose.connect(dbURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

//setup da view
app.set("view engine", "ejs");

//configurações
if (!isProduction) app.use(morgan("dev"));
app.use(cors());
app.disable("x-powered-by");
app.use(compression());

//setup body parser
app.use(bodyParser.urlencoded({ extended: false, limit: 1.5 * 1024 * 1024 }));
app.use(bodyParser.json({ limit: 1.5 * 1024 * 1024 }));

//models
require("./models");

//rotas
app.use("/", require("./routes"));

//404 - ROTA

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

//rota - 422/500/401 and so on
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  if (err.status !== 404) console.warn("Error: ", err.message, new Date());
  res.json(err);
});

//listen
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`running at //127.0.0.1:${PORT}`);
});
