import DatabaseService from "./databaseService";

/**
 * @ProductDatabaseService DatabaseService class extension, contains custom user services
 */
class ProductDatabaseService extends DatabaseService {
  constructor(table, connection) {
    super(table, connection);
  }

  findBySubCategory(subCategory) {
    return this.connection.query(
      `SELECT * FROM ${this.table} WHERE sub_category_id = ?;`,
      subCategory
    );
  }

  findByCategory(category) {
    return this.connection.query(
      `SELECT * FROM ${this.table}
      INNER JOIN sub_categories ON products.sub_category_id = sub_categories.id
        WHERE sub_categories.category_id = ${category};`
    );
  }

  update(data, id) {
    return this.connection.query(`UPDATE ${this.table} SET ? WHERE id = ?`, [
      data,
      id,
    ]);
  }

  async updateProduct(data, id, user) {
    const { name, price, description, stock, sub_category_id } = data;

    //Get product by ID
    const product = await this.findById(id);

    //validate that the product exists
    if (product.length == 0) {
      return { error: true, message: "Product not found" };
    }

    //If user.id is not equal to product.user.id
    if (product[0].user_id !== user[0].id) {
      return { error: true, message: "Invalid Action" };
    }

    //object with the new data to modify
    const newData = {
      name: name || product[0].name,
      price: price || product[0].price,
      description: description || product[0].description,
      stock: stock || product[0].stock,
      sub_category_id: sub_category_id || product[0].sub_category_id,
    };

    //Update product with new data
    const result = await this.update(newData, id);
    if (result.affectedRows == 0) {
      return { error: true, message: "Error" };
    }
    return { message: "Product updated successfully" };
  }
}

module.exports = ProductDatabaseService;
