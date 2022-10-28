import DatabaseService from "./databaseService";

class SubCategoryDatabaseService extends DatabaseService {
  constructor(table, connection) {
    super(table, connection);
  }

  //------------- GET SUBCATEGORIES BY CATEGORY ---------------------------

  findByCategory(category) {
    return this.connection.query(
      `SELECT name FROM ${this.table} WHERE category_id = ?;`,
      category
    );
  }

  update(data, id) {
    return this.connection.query(`UPDATE ${this.table} SET ? WHERE id = ?`, [
      data,
      id,
    ]);
  }

  //------------- UPDATE SUBCATEGORY --------------------------------------
  async updateSubCategory(data, id) {
    const { name } = data;

    const subCategory = await this.findById(id);

    if (subCategory.length == 0) {
      return { error: true, message: "Product not found" };
    }

    const newData = {
      name: name || subCategory[0].name,
    };

    //Update product with new data
    const result = await this.update(newData, id);
    if (result.affectedRows == 0) {
      return { error: true, message: "Error" };
    }
    return { message: "Subcategory updated successfully" };
  }
}

module.exports = SubCategoryDatabaseService;
