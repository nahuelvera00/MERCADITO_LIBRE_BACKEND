import { Router } from "express";
import ProductController from "../controllers/product.controller";
import checkAuth from "../middleware/checkAuth";

const router = Router();

//get all users
router.get("/all", (req, res) => ProductController.getAllProducts(req, res));

router.get("/sub-category/:sub_category_id", (req, res) =>
  ProductController.getProductsBySubCategory(req, res)
);

router.get("/category/:category_id", (req, res) =>
  ProductController.getProductsByCategory(req, res)
);

router.get("/:id", (req, res) => ProductController.getProduct(req, res));

router.post("/", checkAuth, (req, res) =>
  ProductController.createProduct(req, res)
);

router.delete("/:id", checkAuth, (req, res) =>
  ProductController.deleteProduct(req, res)
);

router.put("/:id", checkAuth, (req, res) =>
  ProductController.updateProduct(req, res)
);

module.exports = router;
