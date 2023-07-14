// const xyz = async (req, res) => {}
const User = require("../model/user");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  console.log("req.body", req.body);
  try {
    const {
      userName,
      email,
      password,
      phoneNumber,
      confirmPassword,
      selectedOption,
      userImage,
      address,
    } = req.body;

    console.log("address" + address);

    if (!userName || !email || !password || !confirmPassword)
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
    const flag = selectedOption === undefined ? false : true;
    console.log("flag " + flag);

    const userDetails = new User({
      name: userName || "",
      email: email || "",
      password: hash,
      isAdmin: flag,
      userImage:
        userImage ||
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
      address: address || "Not Yet Added",
      phoneNumber: phoneNumber || "Not Yet Added",
    });

    const user = await userDetails.save();

    if (req.session.hasOwnProperty("isLoggedIn")) {
      req.session.isLoggedIn = true;
      await req.session.save();
    } else {
      req.session.isLoggedIn = true;
      await req.session.save();
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json("Error in registering user");
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

    if (req.session.hasOwnProperty("isLoggedIn")) {
      req.session.isLoggedIn = true;
      await req.session.save();
    } else {
      req.session.isLoggedIn = true;
      await req.session.save();
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log("error", error);
    return res.status(500).json("error in login user");
  }
};

const checkLoginStatus = (req, res) => {
  if (req.session.hasOwnProperty("isLoggedIn")) {
    if (req.session.userLoggedIn === true) {
      return res.status(200).json(true);
    }
  }
  return res.status(200).json(false);
};

const logout = async (req, res) => {
  try {
    if (req.session.hasOwnProperty("isLoggedIn")) {
      req.session.isLoggedIn = false;
      await req.session.save();
    }
    return res.status(200).json("User logged out successfully");
  } catch (error) {
    console.log(error, " error");
    return res.status(500).json("something went wrong while logging out");
  }
};

module.exports = {
  registerUser,
  loginUser,
  checkLoginStatus,
  logout,
};
