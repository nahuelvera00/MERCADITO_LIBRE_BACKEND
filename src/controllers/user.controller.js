import userDatabaseService from "../services/database/userDatabaseService";
import GenerarToken from "../helpers/generateToken";
import PasswordMethods from "../helpers/hashPassword";
import { sendEmailRegister } from "../helpers/sendEmail";
import pool from "./../database/database";

//GET USER
class UserControllers {
  constructor() {
    this.databaseService = new userDatabaseService("users", pool);
  }

  //----------------------------------------------------------------------------------

  /**
   * @getAllUser Get the users registered in the database
   */

  async getAllUser(req, res) {
    const users = await this.databaseService.findAll();
    res.json(users);
  }

  //-----------------------------------------------------------------------------------

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

  //---------------------------------------------------------------------------------------

  /**
   * @returns Return true or false depending if the email is in use
   */

  async inUse(email) {
    const userExist = await this.databaseService.findByEmail(email);
    if (userExist.length == 0) {
      return false;
    } else {
      return true;
    }
  }
  //----------------------------------------------------------------------------------------
  /**
   * @register Register users, req.body: name, email, password
   */

  async register(req, res) {
    const { name, email, password, rol } = req.body;

    //validate that the email is not in use
    if (await this.inUse(email)) {
      res.json({ error: true, message: "Already registered user" });
      return;
    }

    //Encrypt password
    const encryptPassword = await PasswordMethods.hashPassword(password);

    //Generate Token for verify
    const tokenGenerate = GenerarToken.generateToken();

    //Create user
    const user = {
      name,
      email,
      password: encryptPassword,
      token: tokenGenerate,
      rol,
    };

    try {
      const newUser = await this.databaseService.save(user);

      //Send email confirmation
      await sendEmailRegister({
        email,
        name,
        token: tokenGenerate,
      });

      res.json({
        message:
          "User Created Successfully, Check your Email to confirm your account",
      });
    } catch (error) {
      res.status(500).json({
        error: true,
        message: "Error creating the user, check the data entered",
      });
    }
  }
}

module.exports = new UserControllers();
