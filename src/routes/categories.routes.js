import CategoryController from "../controllers/category.controller";
import { Router } from "express";

const router = Router();

router.get("/all", (req, res) => CategoryController.getAllCategories(req, res));
router.get("/:id", (req, res) => CategoryController.getCategoryByID(req, res));
router.post("/", (req, res) => CategoryController.createCategory(req, res));

module.exports = router;
