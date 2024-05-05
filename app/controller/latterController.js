const { Latter, User, UserLatter } = require("../models");
const { Op } = require("sequelize");

const ApiError = require("../../utils/apiError");

const createLatter = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: {
      id,
    },
  });
  const latterBody = req.body;
  try {
    if (!user) {
      return next(new ApiError("Pengguna tidak ditemukan", 404));
    }

    const newLatter = await Latter.create({
      ...latterBody,
    });

    const newUserLatter = await UserLatter.create({
      userId: id,
      latterId: newLatter.id,
    });

    res.status(201).json({
      status: "Success",
      newLatter,
      newUserLatter,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const findAllUserLatter = async (req, res, next) => {
  try {
    const userLatter = await UserLatter.findAll({
      include: ["Latter", "User"],
    });
    res.status(200).json({
      status: "Success",
      userLatter,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const findOnceUserLatter = async (req, res, next) => {
  try {
    let { userId, latterId } = req.params;
    const { name, latterType } = req.query;

    userId = userId ? userId : null;
    latterId = latterId ? latterId : null;

    const whereCondition = {};
    if (name) {
      whereCondition[Op.or] = [
        { "$User.name$": { [Op.iLike]: `%${name.toLowerCase()}%` } },
        { "$Latter.fullName$": { [Op.iLike]: `%${name.toLowerCase()}%` } },
      ];
    }

    if (latterType) {
      whereCondition["$Latter.latterType$"] = latterType;
    }

    if (userId !== null) {
      whereCondition.userId = userId;
    }
    if (latterId !== null) {
      whereCondition.latterId = latterId;
    }

    const userLatter = await UserLatter.findOne({
      where: whereCondition,
      include: ["Latter", "User"],
    });

    if (!userLatter) {
      if (name) {
        return next(
          new ApiError("Data dengan nama yang diberikan tidak ditemukan", 404)
        );
      }
      if (latterType) {
        return next(
          new ApiError(
            "Data dengan latterType yang diberikan tidak ditemukan",
            404
          )
        );
      }
      return next(new ApiError("User tidak ditemukan", 404));
    }

    res.status(200).json({
      status: "Success",
      userLatter,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const updateLatter = async (req, res, next) => {
  const { id } = req.params;
  const latter = await Latter.findOne({
    where: {
      id,
    },
  });
  const latterBody = req.body;
  const condition = {
    where: {
      id,
    },
    returning: true,
  };
  try {
    if (!latter) {
      return next(new ApiError("Surat tidak ditemukan", 404));
    }

    const [_, [updateDataLatter]] = await Latter.update(
      { ...latterBody },
      condition
    );

    const updateLatter = updateDataLatter.toJSON();

    res.status(200).json({
      status: "Success",
      data: updateLatter,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const findAllLatter = async (req, res, next) => {
  try {
    const latter = await Latter.findAll();
    res.status(200).json({
      status: "Success",
      latter,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const findOnceLatter = async (req, res, next) => {
  try {
    const { id } = req.params;
    const latter = await Latter.findOne({
      where: {
        id,
      },
    });
    if (!latter) {
      return next(new ApiError("User tidak ditemukan", 404));
    }
    res.status(200).json({
      status: "Success",
      latter,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

module.exports = {
  createLatter,
  updateLatter,
  findAllUserLatter,
  findOnceUserLatter,
  findAllLatter,
  findOnceLatter,
};
