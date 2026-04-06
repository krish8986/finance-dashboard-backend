import Record from "../models/Record.js";

export const getSummary = async (req, res) => {
  try {
    const userId = req.user._id;

    const records = await Record.find({
      userId,
      isDeleted: false,
    });

    let totalIncome = 0;
    let totalExpense = 0;
    let categoryWise = {};

    records.forEach((record) => {
      if (record.type === "income") {
        totalIncome += record.amount;
      } else {
        totalExpense += record.amount;
      }

      // category wise
      if (!categoryWise[record.category]) {
        categoryWise[record.category] = 0;
      }
      categoryWise[record.category] += record.amount;
    });

    const netBalance = totalIncome - totalExpense;

    res.json({
      totalIncome,
      totalExpense,
      netBalance,
      categoryWise,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching summary" });
  }
};

export const getTrends = async (req, res) => {
  try {
    const userId = req.user._id;

    const records = await Record.find({
      userId,
      isDeleted: false,
    });

    let monthlyData = {};

    records.forEach((record) => {
      const month = new Date(record.date).toLocaleString("default", {
        month: "short",
      });

      if (!monthlyData[month]) {
        monthlyData[month] = { income: 0, expense: 0 };
      }

      if (record.type === "income") {
        monthlyData[month].income += record.amount;
      } else {
        monthlyData[month].expense += record.amount;
      }
    });

    const result = Object.keys(monthlyData).map((month) => ({
      month,
      ...monthlyData[month],
    }));

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error fetching trends" });
  }
};