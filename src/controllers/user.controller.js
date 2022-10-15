import userDatabaseService from "../services/database/userDatabaseService";
import pool from "./../database/database";

//GET USER
class UserControllers {
  constructor() {
    this.databaseService = new userDatabaseService("users", pool);
  }

  /**
   * @getAllUser Get the users registered in the database
   */

  async getAllUser(req, res) {
    const users = await this.databaseService.findAll();
    res.json(users);
  }

  /**
   * @getUser Get user registered in the database by id
   */

  async getUser(req, res) {
    try {
      const { id } = req.params;
      const user = await this.databaseService.findById(id);
      if (user.length == 0) {
        res.status(404).json({ error: true, message: "User not found" });
      } else {
        res.json(user);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  /**
   * @returns Return true or false depending if the email is in use
   */

  async inUse(email) {
    const userExist = await this.databaseService.findByEmail(email);
    if (userExist) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * @register Register users, req.body: name, email, password
   */

  async register(req, res) {
    const { name, email, password, verify, token, rol } = req.body;

    //validate that the email is not in use
    if (this.inUse(email)) {
      res.json({ error: true, message: "Already registered user" });
      return;
    }
    //Create user
    const user = {
      name,
      email,
      password,
      verify,
      token,
      rol,
    };
    const newUser = await this.databaseService.save(user);
    res.json(newUser);
  }
}

module.exports = new UserControllers();
