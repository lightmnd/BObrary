const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const port = 3000;

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.once("open", () => console.log("Connnected to Mongoose"));

const indexRouter = require("./routes/index");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));

app.use("/", indexRouter);

app.listen(process.env.PORT || port, () =>
  console.log(`Example app listening on port ${process.env.PORT || port}!`)
);
