const { UserDues, User } = require("../models");

const ApiError = require("../../utils/apiError");

const createDuesObligate = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: {
      id,
    },
  });
  const { duesId } = req.body;
  try {
    if (!user) {
      return next(new ApiError("Pengguna tidak ditemukan", 404));
    }
    const newDuesUser = await UserDues.create({
      userId: id,
      duesId: duesId,
    });

    res.status(201).json({
      status: "Success",
      newDuesUser,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const createDuesVoluntary = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: {
      id,
    },
  });
  const { duesId, duesVoluntary } = req.body;
  try {
    if (!user) {
      return next(new ApiError("Pengguna tidak ditemukan", 404));
    }
    const newDuesUser = await UserDues.create({
      userId: id,
      duesId: duesId,
      duesVoluntary: duesVoluntary,
    });
    res.status(201).json({
      status: "Success",
      newDuesUser,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const findAll = async (req, res, next) => {
  try {
    const allDuesUser = await UserDues.findAll({
      include: ["Dues", "User"],
    });
    res.status(200).json({
      status: "Success",
      allDuesUser,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const findAllByStatus = async (req, res, next) => {
  try {
    const { duesStatus } = req.query;

    if (!duesStatus) {
      return next(new ApiError("Status tidak diberikan", 400));
    }

    const allDuesUser = await UserDues.findAll({
      where: {
        duesStatus: duesStatus,
      },
    });

    res.status(200).json({
      status: "Success",
      allDuesUser,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

module.exports = {
  createDuesObligate,
  createDuesVoluntary,
  findAllByStatus,
  findAll,
};
