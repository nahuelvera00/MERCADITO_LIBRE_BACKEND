import express from "express";
import morgan from "morgan";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

//IMPORT ROUTES
const app = express();

//CONFIG
app.set("port", 4000);

//MIDDLEWARES
app.use(morgan("dev"));
app.use(express.json());

//MULTER CONFIG

const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/images"),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname.replace(/ /g, "")}`);
  },
});

app.use(
  multer({
    storage,
    fileFilter(req, file, cb) {
      cb(null, true);
    },
  }).array("image")
);

//ROUTES
app.use("/api/users", require("./routes/user.routes"));
app.use("/api/products", require("./routes/product.routes"));
app.use("/api/categories", require("./routes/categories.routes"));
app.use("/api/sub-categories", require("./routes/subCategories.routes"));
app.use("/api/orders", require("./routes/orders.routes"));

//PUBLIC
app.use(express.static("public"));

export default app;
