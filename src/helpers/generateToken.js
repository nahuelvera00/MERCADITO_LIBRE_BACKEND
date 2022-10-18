const jwt = require("jsonwebtoken");

class GenerarToken {
  constructor() {
    this.random = Math.random().toString(32).substring(2);
    this.fecha = Date.now().toString(32);
  }

  generateToken() {
    return this.random + this.fecha;
  }

  /**
   *
   * @param {*} id id user
   * @param {*} role  role user
   * @returns Returns a JsonWebToken with the user information when logging in
   */
  generarJWT(id, role) {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
  }
}

module.exports = new GenerarToken();
