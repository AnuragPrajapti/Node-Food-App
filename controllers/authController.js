const userModal = require("../modals/userModal");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const { userName, email, phone, password, address, answer } = req.body;

    if (!userName || !email || !phone || !password || !address || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please provide all fields",
      });
    }

    const exisiting = await userModal.findOne({ email });
    if (exisiting) {
      return res.status(500).send({
        success: false,
        message: "Email already register please login",
      });
    }

    // hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    const user = await userModal.create({
      userName,
      email,
      phone,
      password: hashedPassword,
      address,
      answer,
    });

    return res.status(201).send({
      success: true,
      message: "Successfully Register!",
      user,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error In register API",
      error: error,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please provide email or passowrd",
      });
    }

    // check user
    const user = await userModal.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(500).send({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const token = JWT.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      token,
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error In login API",
      error: error,
    });
  }
};

module.exports = { registerController, loginController };
