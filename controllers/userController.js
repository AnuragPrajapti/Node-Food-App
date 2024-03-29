// GET USER INFO
const userModal = require("../modals/userModal");
const bcrypt = require("bcryptjs");

const findUser = async (req) => {
  const user = await userModal.findById({ _id: req.body.id });
  if (!user) {
    return res.status(404).send({
      success: false,
      message: "User not found",
    });
  }

  return user;
};

const getUserController = async (req, res) => {
  try {
    const user = await findUser(req);

    user.password = undefined;
    res.status(201).send({
      success: true,
      message: "User get successfully",
      user,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in Get user API",
      error,
    });
  }
};

const updateUserController = async (req, res) => {
  try {
    const user = await findUser(req);
    const { userName, email, phone } = req.body;

    if (userName) user.userName = userName;
    if (email) user.email = email;
    if (phone) user.phone = phone;

    await user.save();

    res.status(201).send({
      success: true,
      message: "Successfully user update",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Update User API",
      error,
    });
  }
};

const updatePasseordController = async (req, res) => {
  try {
    const user = await findUser(req);
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(401).send({
        success: false,
        message: "Please provide old or New password",
      });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      res.status(500).send({
        success: false,
        message: "Invalid Old Password",
      });
    }

    // hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();

    res.status(200).send({
      success: true,
      message: "Password Update!",
    });
  } catch (error) {
    console.log("error -->", error);
    return res.status(401).send({
      success: false,
      message: "Error In Update Password API",
      error,
    });
  }
};

const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    if (!email || !newPassword || !answer) {
      return res.status(401).send({
        success: false,
        message: "Please provide all fields",
      });
    }

    const user = await userModal.findOne({ email, answer });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User not found or invalid answer",
      });
    }

    // hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();

    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(1111, error);
    return res.status(500).send({
      success: false,
      message: "Error in password reset API",
      error,
    });
  }
};

const deleteProfileController = async (req, res) => {
  try {
    await userModal.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Your Account has ben deleted",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in delete profile API",
      error,
    });
  }
};

module.exports = {
  getUserController,
  updateUserController,
  updatePasseordController,
  resetPasswordController,
  deleteProfileController,
};
