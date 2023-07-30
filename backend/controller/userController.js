// const xyz = async (req, res) => {}
const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Order = require("../model/order");

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
    const payload = {
      userId: user._id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "14d",
    });

    return res.status(200).json(token);
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

    const payload = {
      userId: user._id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "14d",
    });

    if (req.session.hasOwnProperty("isLoggedIn")) {
      req.session.isLoggedIn = true;
      await req.session.save();
    } else {
      req.session.isLoggedIn = true;
      await req.session.save();
    }

    return res.status(200).json(token);
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
    console.log("do we even come here?");
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

const fetchUserDetails = async (req, res) => {
  try {
    let userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json("user not found");
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(
        "something went wrong while fething user Details, please try again later"
      );
  }
};

const fetchUserOrders = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json("user not found");
    }

    const userOrders = [];
    await Promise.all(
      user.orders.map(async (orderId) => {
        const order = await Order.findById(orderId);
        userOrders.push(order);
      })
    );

    return res.status(200).json(userOrders);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Error found while fetching ordres");
  }
};

const updateUserDetails = async (req, res) => {
  try {
    let userId = req.userId;
    const { name, email, password, newPassword, userImage } = req.body;

    console.log(
      "name " +
        name +
        "email " +
        email +
        "password " +
        password +
        "new password " +
        newPassword +
        " user image " +
        userImage
    );
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json("User Not Fount");
    }
    if (email !== "" && email !== user.email) {
      const exist = await User.findOne({ email });
      if (exist) {
        return res
          .status(500)
          .json("Email Id already exist, please try diffrent Email Id");
      }
    }
    if (password !== "") {
      const isPasswordCorrect = bcrypt.compareSync(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(404).json("password not correct");
      }
    }
    if (
      (password === "" && newPassword !== "") ||
      (password !== "" && newPassword === "")
    ) {
      return res.status(500).json("Password or New Password is Missing");
    }
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const updatedPasswordHash = bcrypt.hashSync(newPassword, salt);
    const newUserObject = {
      name: name === "" ? user.name : name,
      email: email === "" ? user.email : email,
      userImage: userImage === "" ? user.userImage : userImage,
      password: password === "" ? user.password : updatedPasswordHash,
    };

    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      {
        $set: {
          name: newUserObject.name,
          email: newUserObject.email,
          userImage: newUserObject.userImage,
          password: newUserObject.password,
        },
      },
      { new: true }
    );

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json("something went wrong while updating user, Try again later");
  }
};

const deleteSession = async (req, res) => {
  try {
    // const status = await
    const store = req.sessionStore;
    console.log(store + " store");
    await store.clear();
    return res.status(200).json("seesion has been deleted");
  } catch (error) {
    console.log(error);
    return res.status(500).json("error in deleted sessions");
  }
};

const placeOrderTemplate = async (req, res) => {
  console.log("here we come");
  return res.render("placeOrder");
};

module.exports = {
  registerUser,
  loginUser,
  checkLoginStatus,
  logout,
  fetchUserDetails,
  fetchUserOrders,
  updateUserDetails,
  deleteSession,
  placeOrderTemplate,
};
