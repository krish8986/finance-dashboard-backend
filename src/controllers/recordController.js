import Record from "../models/Record.js";
import asyncHandler from "express-async-handler";

// CREATE RECORD
export const createRecord = asyncHandler(async (req, res) => {
  const { amount, type, category, date, note } = req.body;

  // Validation
  if (!amount || amount <= 0) {
    res.status(400);
    throw new Error("Amount must be positive");
  }

  if (!["income", "expense"].includes(type)) {
    res.status(400);
    throw new Error("Invalid type");
  }

  if (!category) {
    res.status(400);
    throw new Error("Category is required");
  }

  const record = await Record.create({
    userId: req.user._id,
    amount,
    type,
    category,
    date,
    note,
  });

  res.status(201).json({
    success: true,
    data: record,
  });
});


// GET RECORDS
export const getRecords = asyncHandler(async (req, res) => {
  const { type, category, startDate, endDate } = req.query;

  let filter = {
    userId: req.user._id,
    isDeleted: false,
  };

  if (type) filter.type = type;
  if (category) filter.category = category;

  if (startDate && endDate) {
    filter.date = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
  }

  const records = await Record.find(filter).sort({ date: -1 });

  res.json({
    success: true,
    data: records,
  });
});


//  UPDATE RECORD
export const updateRecord = asyncHandler(async (req, res) => {
  const record = await Record.findById(req.params.id);

  if (!record || record.isDeleted) {
    res.status(404);
    throw new Error("Record not found");
  }

  // Ownership check
  if (record.userId.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not allowed");
  }

  Object.assign(record, req.body);
  await record.save();

  res.json({
    success: true,
    data: record,
  });
});


//  DELETE RECORD (SOFT DELETE)
export const deleteRecord = asyncHandler(async (req, res) => {
  const record = await Record.findById(req.params.id);

  if (!record || record.isDeleted) {
    res.status(404);
    throw new Error("Record not found");
  }

  if (record.userId.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not allowed");
  }

  record.isDeleted = true;
  await record.save();

  res.json({
    success: true,
    message: "Record deleted",
  });
});