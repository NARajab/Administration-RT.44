const { Dues } = require("../models");

const ApiError = require("../../utils/apiError");
const { Sequelize } = require("sequelize");

const createDuesObligat = async () => {
  const now = new Date();
  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const currentMonthName = monthNames[now.getMonth()];

  const duesData = {
    duesName: `Iuran Bulan ${currentMonthName}`,
    duesType: "Wajib/Sosial",
    price: 150000,
  };
  try {
    await Dues.create(duesData);
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const createDuesVoluntary = async (req, res, next) => {
  const { duesName } = req.body;
  try {
    const newDues = await Dues.create({ duesName, duesType: "Sukarela" });
    res.status(201).json({
      status: "Success",
      newDues,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const findAllDues = async (req, res, next) => {
  try {
    const allDues = await Dues.findAll();

    res.status(200).json({
      status: "Success",
      allDues,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const findAllDuesByMonth = async (req, res, next) => {
  try {
    const { month } = req.query;

    const monthInt = parseInt(month);
    if (isNaN(monthInt) || monthInt < 1 || monthInt > 12) {
      return next(new ApiError("Bulan yang disediakan tidak valid", 400));
    }

    const allDues = await Dues.findAll({
      where: Sequelize.where(
        Sequelize.fn("EXTRACT", Sequelize.literal('MONTH FROM "createdAt"')),
        parseInt(month)
      ),
    });

    if (allDues.length === 0) {
      return res.status(200).json({
        status: "Success",
        message: "Tidak ada data yang tersedia untuk bulan yang diberikan",
      });
    }

    res.status(200).json({
      status: "Success",
      allDues,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

module.exports = {
  createDuesObligat,
  createDuesVoluntary,
  findAllDues,
  findAllDuesByMonth,
};
