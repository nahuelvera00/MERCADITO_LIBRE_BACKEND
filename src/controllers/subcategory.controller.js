import SubCategoryDatabaseService from "../services/database/subCategoryDatabaseService";
import pool from "../database/database";

class SubCategoryController {
  constructor() {
    this.databaseService = new SubCategoryDatabaseService(
      "sub_categories",
      pool
    );
  }

  //-------------------- GET ALL SUBCATEGORIES -----------------------------------------------

  async getAllSubCategories(req, res) {
    const subCategories = await this.databaseService.findAll();
    if (subCategories.length == 0) {
      res.json({ error: true, message: "Categories not found" });
    }

    res.json(subCategories);
  }

  //-------------------- GET SUBCATEGORIES BY CATEGORY ---------------------------------------
  async getSubCategoriesByCategory(req, res) {
    const { category } = req.params;
    const subCategories = await this.databaseService.findByCategory(category);

    if (subCategories.length == 0) {
      res.json({ error: true, message: "Categories not found" });
    }

    res.json(subCategories);
  }
  //-------------------- CREATE SUBCATEGORY --------------------------------------------------

  async createSubCategory(req, res) {
    const { name, category_id } = req.body;

    const data = {
      name,
      category_id,
    };

    const subCategory = await this.databaseService.save(data);

    if (subCategory.affectedRows == 0) {
      res.json({ error: true, message: "Invalid Action" });
    }
    res.json({ message: "Subcategory created successfully" });
  }

  //-------------------- UPDATE SUBCATEGORY --------------------------------------------------

  async updateSubCategory(req, res) {
    const { name } = req.body;
    const { id } = req.params;

    const data = {
      name,
    };
    const result = await this.databaseService.updateSubCategory(data, id);
    res.json(result);
  }

  //-------------------- DELETE SUBCATEGORY --------------------------------------------------

  async deleteSubCategory(req, res) {
    const { id } = req.params;

    const subCategory = await this.databaseService.findById(id);
    if (subCategory.length == 0) {
      res.json({ message: "Product not found" });
      return;
    }
    const result = await this.databaseService.delete(id);

    if (result.affectedRows == 0) {
      res.json({ error: true, message: "Invalid Action" });
    }
    res.json({ message: "Subcategory deleted successfully" });
  }
}

module.exports = new SubCategoryController();
