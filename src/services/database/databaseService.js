/**
 * @DatabaseService Class that contains basic functionalities (findAll, findOne, save, delete, etc)
 */

class DatabaseService {
  constructor(table, connection) {
    this.table = table;
    this.connection = connection;
  }

  /**
   * @returns Este metodo retorna los datos de una table
   */

  findAll() {
    return this.connection.query(`SELECT * from ${this.table};`);
  }

  findById(id) {
    return this.connection.query(
      `SELECT * FROM ${this.table} WHERE id = ?;`,
      id
    );
  }

  save(entity) {
    return this.connection.query(`INSERT INTO ${this.table} SET ?`, entity);
  }
}

module.exports = DatabaseService;
