import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getSummary, getTrends } from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/summary", protect, getSummary);
router.get("/trends", protect, getTrends);

export default router;