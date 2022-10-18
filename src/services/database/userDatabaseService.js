import DatabaseService from "./databaseService";

/**
 * @UserDatabaseService DatabaseService class extension, contains custom user services
 */
class UserDatabaseService extends DatabaseService {
  constructor(table, connection) {
    super(table, connection);
  }
  findByEmail(email) {
    return this.connection.query(
      `SELECT * FROM ${this.table} WHERE email = ?;`,
      email
    );
  }

  findByToken(token) {
    return this.connection.query(
      `SELECT * FROM ${this.table} WHERE token = ?`,
      token
    );
  }

  update(data, id) {
    return this.connection.query(`UPDATE ${this.table} SET ? WHERE id = ?`, [
      data,
      id,
    ]);
  }
}

module.exports = UserDatabaseService;
