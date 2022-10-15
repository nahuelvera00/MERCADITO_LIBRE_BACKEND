import { Router } from "express";
import UserControllers from "../controllers/user.controller";
const router = Router();

router.get("/", (req, res) => UserControllers.getAllUser(req, res));
router.get("/:id", (req, res) => UserControllers.getUser(req, res));
router.post("/", (req, res) => UserControllers.register(req, res));

module.exports = router;
