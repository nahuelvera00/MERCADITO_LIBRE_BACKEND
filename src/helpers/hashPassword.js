const bcrypt = require("bcrypt");

class PasswordMethods {
  constructor() {}

  async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
}

module.exports = new PasswordMethods();
