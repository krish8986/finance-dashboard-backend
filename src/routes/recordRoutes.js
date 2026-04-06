import express from "express";
import {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord,
} from "../controllers/recordController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createRecord);
router.get("/", protect, getRecords);
router.patch("/:id", protect, updateRecord);
router.delete("/:id", protect, deleteRecord);

export default router;