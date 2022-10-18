const bcrypt = require("bcrypt");

class PasswordMethods {
  constructor() {}

  /**
   * @params Password
   * @hashPassword Generate password hashed
   * @returns Password hashed
   */
  async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async checkPassword(passwordFormulario, passwordUser) {
    return await bcrypt.compare(passwordFormulario, passwordUser);
  }
}

module.exports = new PasswordMethods();
