const DatabaseService = require("./databaseService");

class CategoryDatabaseService extends DatabaseService {
  constructor(table, connection) {
    super(table, connection);
  }
}

module.exports = CategoryDatabaseService;
