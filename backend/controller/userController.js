// const xyz = async (req, res) => {}
const User = require("../model/user");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phoneNumber,
      confirmPassword,
      selectedOption,
      userImage,
      address,
    } = req.body;

    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      !phoneNumber ||
      !selectedOption ||
      !userImage ||
      !address
    )
      return res.status(500).json("Please feild all input field correctly");

    if (password !== confirmPassword) {
      return res.status(500).json("password and confirm Password not match");
    }

    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(404).json("this email id is already presenet");
    }
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    const flag = selectedOption ? true : false;

    const userDetails = new User({
      name,
      email,
      password: hash,
      isAdmin: flag,
      userImage,
      address,
      phoneNumber,
    });

    const user = await userDetails.save();
    return res.status(200).json(user);
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json("error in registering user");
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(500).json("please fill all the feild correctly");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json("user Not found");
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(404).json("password not correct");
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log("error", error);
    return res.status(500).json("error in login user");
  }
};

module.exports = {
  registerUser,
  loginUser,
};
