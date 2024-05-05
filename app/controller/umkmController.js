const { Umkm } = require("../models");
const { Op } = require("sequelize");

const ApiError = require("../../utils/apiError");

const createUmkm = async (req, res, next) => {
  const umkmBody = req.body;

  try {
    const newUmkm = await Umkm.create({
      ...umkmBody,
    });

    res.status(201).json({
      status: "Success",
      newUmkm,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const updateUmkm = async (req, res, next) => {
  const { id } = req.params;
  const umkm = await Umkm.findOne({
    where: {
      id,
    },
  });
  const umkmBody = req.body;
  const condition = {
    where: {
      id,
    },
    returning: true,
  };
  try {
    if (!umkm) {
      return next(new ApiError("Pengguna tidak ditemukan", 404));
    }

    const [_, [umkmUpdateData]] = await Umkm.update(
      {
        ...umkmBody,
      },
      condition
    );
    const umkmUpdate = umkmUpdateData.toJSON();
    res.status(201).json({
      status: "Success",
      data: umkmUpdate,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const getAllUmkm = async (req, res, next) => {
  try {
    const allUmkm = await Umkm.findAll();
    res.status(200).json({
      status: "Success",
      allUmkm,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const getOnceUmkm = async (req, res, next) => {
  let umkm;
  try {
    if (req.params.id) {
      umkm = await Umkm.findByPk(req.params.id);
    } else if (req.query.name) {
      umkm = await Umkm.findAll({
        where: {
          name: { [Op.iLike]: `%${req.query.name.toLowerCase()}%` },
        },
      });
    } else {
      return next(new ApiError("Umkm tidak ditemukan", 404));
    }
    res.status(200).json({
      status: "Success",
      umkm,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

module.exports = {
  createUmkm,
  getAllUmkm,
  getOnceUmkm,
  updateUmkm,
};
