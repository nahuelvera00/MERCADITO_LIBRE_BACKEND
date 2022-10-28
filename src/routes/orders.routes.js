import { Router } from "express";
import checkAuth from "../middleware/checkAuth";
import OrderController from "../controllers/order.controller";

const router = Router();

router.post("/", checkAuth, (req, res) =>
  OrderController.createOrder(req, res)
);

router.get("/buyer", checkAuth, (req, res) =>
  OrderController.getOrdersBuyer(req, res)
);

router.get("/seller", checkAuth, (req, res) =>
  OrderController.getOrdersSeller(req, res)
);
module.exports = router;
