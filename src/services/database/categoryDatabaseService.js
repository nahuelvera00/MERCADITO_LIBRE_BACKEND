const DatabaseService = require("./databaseService");

class CategoryDatabaseService extends DatabaseService {
  constructor(table, connection) {
    super(table, connection);
  }

  update(data, id) {
    return this.connection.query(`UPDATE ${this.table} SET ? WHERE id = ?`, [
      data,
      id,
    ]);
  }

  async updateCategory(data, id) {
    const { name } = data;

    //Get category by ID
    const category = await this.findById(id);

    //validate that the product exists
    if (category.length == 0) {
      return { error: true, message: "Category not found" };
    }

    //object with the new data to modify
    const newData = {
      name: name || category[0].name,
    };

    //Update category with new data
    const result = await this.update(newData, id);
    if (result.affectedRows == 0) {
      return { error: true, message: "Error" };
    }
    return { message: "Category updated successfully" };
  }
}

module.exports = CategoryDatabaseService;
