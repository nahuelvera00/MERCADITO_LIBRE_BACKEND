import { Router } from "express";
import UserControllers from "../controllers/user.controller";
const router = Router();

router.post("/", (req, res) => UserControllers.register(req, res));
router.get("/confirm/:token", (req, res) =>
  UserControllers.confirmAccount(req, res)
);
router.post("/login", (req, res) => UserControllers.authenticate(req, res));
router.post("/forget-password", (req, res) =>
  UserControllers.recoverPassword(req, res)
);
router
  .route("/forget-password/:token")
  .get((req, res) => UserControllers.checkToken(req, res))
  .post((req, res) => UserControllers.newPassword(req, res));

module.exports = router;
