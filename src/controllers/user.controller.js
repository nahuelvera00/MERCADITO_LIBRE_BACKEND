import userDatabaseService from "../services/database/userDatabaseService";
import GenerarToken from "../helpers/generateToken";
import PasswordMethods from "../helpers/hashPassword";
import {
  sendEmailRecoverPassword,
  sendEmailRegister,
} from "../helpers/sendEmail";
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
      rol: rol || "user",
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

  //------------------------------------------------------------------------------

  /**
   * @confirmAccount receives a token to search the database for an account to confirm and validates it
   * @param {*} req token
   * @returns message
   */
  async confirmAccount(req, res) {
    const { token } = req.params;

    //Ask the database for a user with that token
    const userConfirm = await this.databaseService.findByToken(token);

    //verify that there is a user with that token
    if (userConfirm.length == 0) {
      return res.status(403).json({ error: true, message: "Invalid Token" });
    }

    try {
      //New data user
      const data = {
        token: "",
        verify: 1,
      };

      //update user data
      const result = await this.databaseService.update(data, userConfirm[0].id);
      if (result.affectedRows == 0) {
        res.json({ error: true, message: "Invalid Action" });
      }
      res.json({ message: "Account confirmed successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  //---------------------------------------------------------------------
  async authenticate(req, res) {
    const { email, password } = req.body;

    //Get user by Email
    const user = await this.databaseService.findByEmail(email);

    //Verify that the user exists
    if (user.length == 0) {
      res.status(404).json({
        error: true,
        message: "User does not exist",
      });
    }

    //Verify that the user is confirmed
    if (user[0].verify == 0) {
      res.status(404).json({
        error: true,
        message: "Unconfirmed user",
      });
    }

    //Check password
    if (await PasswordMethods.checkPassword(password, user[0].password)) {
      res.json({
        id: user[0].id,
        name: user[0].name,
        email: user[0].email,
        token: GenerarToken.generarJWT(user[0].id, user[0].rol),
        rol: user[0].rol,
      });
    }
  }

  //---------------------------------------------------------------------------------------------------------------------------------------

  async recoverPassword(req, res) {
    const { email } = req.body;
    const user = await this.databaseService.findByEmail(email);

    if (user.length == 0) {
      res.status(404).json({ error: true, message: "User does not exist" });
    }

    try {
      //New data user
      const data = {
        token: GenerarToken.generateToken(),
      };

      //update user data
      const result = await this.databaseService.update(data, user[0].id);
      if (result.affectedRows == 0) {
        res.json({ error: true, message: "Invalid Action" });
      }
      //Send password recovery email
      await sendEmailRecoverPassword({
        email,
        name: user[0].name,
        token: data.token,
      });
      res.status(200).json({
        message: "We send you an email so you can recover your password",
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  //-----------------------------------------------------------------------------------------

  /**
   * @checkToken Verify if it exist user
   * @param {*} req Require Token
   */
  async checkToken(req, res) {
    const { token } = req.params;

    const validToken = await this.databaseService.findByToken(token);

    if (validToken.length == 0) {
      const error = new Error("Invalid Token");
      return res.status(404).json({ message: error.message });
    }
    //response
    res.json({ message: "Valid token, user exists" });
  }

  //-----------------------------------------------------------------------------------------

  /**
   * @newPassword Reset password
   * @param {*} req Require token and new password
   * @returns Message
   */

  async newPassword(req, res) {
    const { token } = req.params;
    const { password } = req.body;

    try {
      //Get the user by token
      const user = await this.databaseService.findByToken(token);

      //Check if the user exists
      if (user.length == 0) {
        const error = new Error("Invalid Token");
        return res.status(404).json({ message: error.message });
      }

      //New data for user
      const data = {
        password: await PasswordMethods.hashPassword(password),
        token: "",
      };

      //Update data
      const result = await this.databaseService.update(data, user[0].id);
      if (result.affectedRows == 0) {
        res.json({ error: true, message: "Invalid Action" });
      }
      //RESPONSE
      res.json({ message: "Your password reset successfully" });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
}

module.exports = new UserControllers();
