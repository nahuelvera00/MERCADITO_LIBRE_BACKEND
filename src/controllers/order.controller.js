import OrderDatabaseService from "../services/database/orderDatabaseService";
import pool from "../database/database";

class OrderController {
  constructor() {
    this.databaseService = new OrderDatabaseService("orders", pool);
  }

  //---------------------- CREATE ORDER ---------------------------------------------
  async createOrder(req, res) {
    const {
      seller_id,
      fullname,
      dni,
      street,
      number,
      cp,
      shipping_price,
      product_id,
      total,
    } = req.body;

    if (seller_id == req.user[0].id) {
      res.json({ error: true, message: "You cant buy your products" });
    }

    const data = {
      buyer_id: req.user[0].id,
      seller_id,
      fullname,
      dni,
      street,
      number,
      cp,
      shipping_price,
      product_id,
      total,
      date: new Date().toLocaleDateString(),
    };

    try {
      const order = await this.databaseService.save(data);
      if (order.affectedRows == 0) {
        res.json({ error: true, message: "Invalid Action" });
      }
      res.json({ message: "Order created successfully" });
    } catch (error) {
      console.log(error);
    }
  }

  //------------- GET ORDERS BUYER -------------------------------------------------
  async getOrdersBuyer(req, res) {
    try {
      const orders = await this.databaseService.findByBuyerId(req.user[0].id);

      if (orders.length == 0) {
        res.json({ message: "You have no orders" });
      }
      res.json(orders);
    } catch (error) {}
  }

  //----------- GET ORDERS SELLER ---------------------------------------------------

  async getOrdersSeller(req, res) {
    try {
      console.log(req.user);
      const orders = await this.databaseService.findBySellerId(req.user[0].id);
      if (orders.length == 0) {
        res.json({ message: "You have no orders" });
      }
      res.json(orders);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new OrderController();
