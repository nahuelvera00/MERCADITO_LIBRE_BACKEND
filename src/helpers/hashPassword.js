const bcrypt = require("bcrypt");

class PasswordMethods {
  constructor() {}

  //-----------------------------------------------------------------------------------------------------------------------
  /**
   * @hashPassword Generate password hashed
   * @params Password
   * @returns Password hashed
   */
  async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  //------------------------------------------------------------------------------------------------------------------------

  /**
   *
   * @param {*} passwordFormulario password req.body
   * @param {*} passwordUser password DB
   * @returns returns true if the parameters match, otherwise false
   */
  async checkPassword(passwordFormulario, passwordUser) {
    return await bcrypt.compare(passwordFormulario, passwordUser);
  }
}

module.exports = new PasswordMethods();
