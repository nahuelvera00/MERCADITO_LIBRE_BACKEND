import DatabaseService from "./databaseService";

class subCategoryDatabaseService extends DatabaseService {
  constructor(table, connection) {
    super(table, connection);
  }

  //------------- UPDATE SUBCATEGORY --------------------------------------
  update(data, id) {
    return this.connection.query(`UPDATE ${this.table} SET ? WHERE id = ?`, [
      data,
      id,
    ]);
  }
}

module.exports = subCategoryDatabaseService;
