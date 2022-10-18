class GenerarToken {
  constructor() {
    this.random = Math.random().toString(32).substring(2);
    this.fecha = Date.now().toString(32);
  }

  generateToken() {
    return this.random + this.fecha;
  }
}

module.exports = new GenerarToken();
