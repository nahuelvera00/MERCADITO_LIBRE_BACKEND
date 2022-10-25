const CategoryDatabaseService = require("../services/database/categoryDatabaseService");
import pool from "./../database/database";

class CategoryController {
  constructor() {
    this.databaseService = new CategoryDatabaseService("categories", pool);
  }

  //------------ GET ALL CATEGORIES --------------------------------------------------------------------
  async getAllCategories(req, res) {
    const categories = await this.databaseService.findAll();
    if (categories.length == 0) {
      res.json({ error: true, message: "Categories not found" });
    }

    res.json(categories);
  }

  //----------- GET CATEGORY BY ID --------------------------------------------------------------------

  async getCategoryByID(req, res) {
    const { id } = req.params;
    try {
      const category = await this.databaseService.findById(id);
      if (category.length == 0) {
        res.json({ error: true, message: "Category not found" });
      }

      res.json(category);
    } catch (error) {
      console.log(error);
    }
  }

  //------------- CREATE CATEGORY ------------------------------------------------------------------------

  async createCategory(req, res) {
    const { name } = req.body;

    const data = {
      name,
    };

    const category = await this.databaseService.save(data);
    if (category.affectedRows == 0) {
      res.json({ error: true, message: "Invalid Action" });
    }
    res.json({ message: "Category created successfully" });
  }

  //----------------- UPDATE CATEGORY -----------------------------------------------------------------------

  async updateCategory(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    try {
      const category = await this.databaseService.findById(id);
      if (category.length == 0) {
        res.json({ error: true, message: "Category not found" });
      }

      const data = {
        name,
      };
      const result = await this.databaseService.updateCategory(data, id);
      res.json(result);
    } catch (error) {
      console.log(error.message);
    }
  }

  //------------------ DELETE CATEGORY ----------------------------------------------------------------------

  async deleteCategory(req, res) {
    const { id } = req.params;

    const category = await this.databaseService.findById(id);
    if (category.length == 0) {
      res.json({ message: "Category not found" });
      return;
    }

    try {
      const result = await this.databaseService.delete(id);

      if (result.affectedRows == 0) {
        res.json({ error: true, message: "Invalid Action" });
      }
      res.json({ message: "Category deleted successfully" });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new CategoryController();
