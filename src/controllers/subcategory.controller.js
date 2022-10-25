import SubCategoryDatabaseService from "../services/database/productDatabaseService";
import pool from "../database/database";

class CategoryController {
  constructor() {
    this.databaseService = new SubCategoryDatabaseService(
      "sub_categories",
      pool
    );
  }

  //-------------------- GET ALL SUBCATEGORIES -----------------------------------------------

  //-------------------- GET SUBCATEGORIES BY CATEGORY ---------------------------------------

  //-------------------- CREATE SUBCATEGORY --------------------------------------------------

  //-------------------- UPDATE SUBCATEGORY --------------------------------------------------

  //-------------------- DELETE SUBCATEGORY --------------------------------------------------
}
