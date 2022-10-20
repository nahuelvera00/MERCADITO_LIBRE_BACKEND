import express from "express";
import morgan from "morgan";

//IMPORT ROUTES
const app = express();

//CONFIG
app.set("port", 4000);

//MIDDLEWARES
app.use(morgan("dev"));
app.use(express.json());

//ROUTES
app.use("/api/users", require("./routes/user.routes"));
app.use("/api/products", require("./routes/product.routes"));
app.use("/api/categories", require("./routes/categories.routes"));

export default app;
