const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const db = require("./db/models");
const morgan = require("morgan");
const categoryRouter = require("./routes/category");
const IngredientRouter = require("./routes/ingredient");
const recipeRouter = require("./routes/recipe");
app.use(morgan("dev"));

app.use(express.json());
app.use(cors());
app.use("/category", categoryRouter);
app.use("/ingredient", IngredientRouter);
app.use("/recipe", recipeRouter);
app.use("/media", express.static(path.join(__dirname, "media")));

app.use((req, res, next) => {
  next({
    status: 404,
    message: "Path Not Found",
  });
});

app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
});

app.listen(8082);
db.sequelize.sync({ alter: true });
