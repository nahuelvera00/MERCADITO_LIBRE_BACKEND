import ProductDatabaseService from "../services/database/productDatabaseService";
import pool from "../database/database";

class ProductController {
  constructor() {
    this.databaseService = new ProductDatabaseService("products", pool);
  }

  //----------- GET ALL PRODUCTS -----------------------------------------------------------------------------------------------

  async getAllProducts(req, res) {
    try {
      const products = await this.databaseService.findAll();
      if (products.length == 0) {
        res.json({ message: "There are no products in the database" });
        return;
      }
      res.json(products);
    } catch (error) {
      res.status(404).json({ error: true, message: "Server Error" });
    }
  }

  //----------- GET PRODUCT ----------------------------------------------------------------------------------------------------

  async getProduct(req, res) {
    const { id } = req.params;

    try {
      const product = await this.databaseService.findById(id);
      if (product.length == 0) {
        res.json({ message: "There are no product in the database" });
        return;
      }
      res.json(product);
    } catch (error) {}
  }

  //----------- GET PRODUCTS BY SUB_CATEGORY -----------------------------------------------------------------------------------

  async getProductsBySubCategory(req, res) {
    const { sub_category_id } = req.params;

    try {
      const products = await this.databaseService.findBySubCategory(
        sub_category_id
      );
      if (products.length == 0) {
        res.json({ message: "There are no products in this category" });
      }
      res.json(products);
    } catch (error) {
      console.log(error.message);
    }
  }
  //----------- GET PRODUCT BY CATEGORY ---------------------------------------------------------------------------------------

  async getProductsByCategory(req, res) {
    const { category_id } = req.params;

    try {
      const products = await this.databaseService.findByCategory(category_id);
      if (products.length == 0) {
        res.json({ message: "There are no products in this category" });
      }
      res.json(products);
    } catch (error) {
      console.log(error.message);
    }
  }

  //----------- CREATE NEW PRODUCT ---------------------------------------------------------------------------------------------

  async createProduct(req, res) {
    const { name, price, description, stock, sub_category_id } = req.body;
    const image = req.files;

    const data = {
      name,
      price,
      description,
      stock,
      image: image[0].filename,
      user_id: req.user[0].id,
      sub_category_id,
    };

    try {
      const user = await this.databaseService.save(data);
      if (user.affectedRows == 0) {
        res.json({ error: true, message: "Invalid Action" });
      }
      res.json({ message: "Product created successfully" });
    } catch (error) {
      console.log(error);
    }
  }

  //----------- UPDATE PRODUCT -------------------------------------------------------------------------------------------------

  async updateProduct(req, res) {
    const { name, price, description, stock, sub_category_id } = req.body;
    const { id } = req.params;

    const data = {
      name,
      price,
      description,
      stock,
      sub_category_id,
    };
    const result = await this.databaseService.updateProduct(data, id, req.user);
    res.json(result);
  }

  //----------- DELETE PRODUCT -------------------------------------------------------------------------------------------------

  async deleteProduct(req, res) {
    const { id } = req.params;
    const product = await this.databaseService.findById(id);
    if (product.length == 0) {
      res.json({ message: "Product not found" });
      return;
    }

    if (product[0].id === req.user[0].id) {
      try {
        const result = await this.databaseService.delete(id);

        if (result.affectedRows == 0) {
          res.json({ error: true, message: "Invalid Action" });
        }
        res.json({ message: "Product deleted successfully" });
      } catch (error) {
        console.log(error);
      }
    } else {
      res.json({ error: true, message: "Bad request" });
    }
  }
}

module.exports = new ProductController();
