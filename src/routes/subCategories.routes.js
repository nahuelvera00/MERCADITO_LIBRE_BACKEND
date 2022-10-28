import SubCategoryController from "../controllers/subcategory.controller";
import { Router } from "express";

const router = Router();

router.get("/all", (req, res) =>
  SubCategoryController.getAllSubCategories(req, res)
);
router.get("/:category", (req, res) =>
  SubCategoryController.getSubCategoriesByCategory(req, res)
);

router.post("/", (req, res) =>
  SubCategoryController.createSubCategory(req, res)
);

router.put("/:id", (req, res) =>
  SubCategoryController.updateSubCategory(req, res)
);

router.delete("/:id", (req, res) =>
  SubCategoryController.deleteSubCategory(req, res)
);

module.exports = router;
