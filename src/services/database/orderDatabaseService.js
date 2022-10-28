import DatabaseService from "./databaseService";

class OrderDatabaseService extends DatabaseService {
  constructor(table, connection) {
    super(table, connection);
  }

  findByBuyerId(id) {
    return this.connection.query(
      `SELECT
      orders.id,
      orders.buyer_id,
      orders.seller_id,
      users.name,
      users.email,
      orders.fullname,
      orders.dni,
      orders.street,
      orders.number,
      orders.cp,
      orders.shipping_price,
      orders.product_id,
      products.name,
      products.price,
      products.description,
      products.image,
      orders.total,
      orders.date,
      orders.payment_status,
      orders.shipping_status
  FROM
      ${this.table}
  INNER JOIN users ON orders.buyer_id = users.id
  INNER JOIN products ON orders.product_id = products.id
  WHERE orders.buyer_id = ?;`,
      id
    );
  }
  findBySellerId(id) {
    return this.connection.query(
      `SELECT
    orders.id,
    orders.buyer_id,
    users.name,
    users.email,
    orders.seller_id,
    orders.fullname,
    orders.dni,
    orders.street,
    orders.number,
    orders.cp,
    orders.shipping_price,
    orders.product_id,
    products.name,
    products.price,
    products.description,
    products.image,
    orders.total,
    orders.date,
    orders.payment_status,
    orders.shipping_status
FROM
    ${this.table}
INNER JOIN users ON orders.buyer_id = users.id
INNER JOIN products ON orders.product_id = products.id
WHERE orders.seller_id = ?;`,
      id
    );
  }
}

module.exports = OrderDatabaseService;
