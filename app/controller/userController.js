const bcrypt = require("bcrypt");
const path = require("path");
const { User, Auth } = require("../models");
const { Op, where } = require("sequelize");

const imagekit = require("../libs/imagekit");
const ApiError = require("../../utils/apiError");

const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.findAll();
    res.status(200).json({
      status: "Success",
      allUsers,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const getOneUser = async (req, res, next) => {
  let user;
  try {
    if (req.params.id) {
      user = await User.findByPk(req.params.id);
    } else if (req.query.name) {
      user = await User.findAll({
        where: {
          name: { [Op.iLike]: `%${req.query.name.toLowerCase()}%` },
        },
      });
    } else {
      return next(new ApiError("Not found", 404));
    }
    res.status(200).json({
      status: "Success",
      user,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const createUser = async (req, res, next) => {
  try {
    const {
      name,
      email,
      phoneNumber,
      address,
      noHome,
      placeDateBday,
      gender,
      blockHome,
    } = req.body;

    const user = await Auth.findOne({
      where: {
        email,
      },
    });

    if (user) {
      return next(new ApiError("Email pengguna sudah digunakan", 400));
    }

    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(
      process.env.PASSWORD_HASH_MEMBER,
      saltRounds
    );

    const newUser = await User.create({
      name,
      phoneNumber,
      address,
      noHome,
      placeDateBday,
      gender,
      blockHome,
      role: "member",
    });

    await Auth.create({
      email,
      password: hashedPassword,
      userId: newUser.id,
    });

    res.status(201).json({
      status: "Success",
      newUser,
      email,
      password: hashedPassword,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: {
      id,
    },
  });

  const userBody = req.body;
  const file = req.file;
  const condition = {
    where: {
      id,
    },
    returning: true,
  };
  let image;
  try {
    if (!user) {
      return next(new ApiError("Pengguna tidak ditemukan", 404));
    }

    if (file) {
      const filename = file.originalname;
      const extension = path.extname(filename);
      const uploadImage = await imagekit.upload({
        file: file.buffer,
        fileName: `IMG-${Date.now()}.${extension}`,
      });
      image = uploadImage.url;
    }

    const [_, [updatedUserData]] = await User.update(
      { ...userBody, image },
      condition
    );
    const updatedUser = updatedUserData.toJSON();

    res.status(200).json({
      status: "Success",
      data: updatedUser,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const deleteUser = async (req, res, next) => {
  const user = await User.findOne({
    where: {
      id: req.params.id,
    },
  });
  try {
    if (!user) {
      return next(new ApiError("Pengguna tidak ditemukan", 404));
    }

    await User.destroy({
      where: {
        id: req.params.id,
      },
    });

    await Auth.destroy({
      where: {
        userId: req.params.id,
      },
    });

    res.status(200).json({
      status: "Success",
      message: "Pengguna berhasil di hapus",
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
};
