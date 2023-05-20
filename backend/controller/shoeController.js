const ShoeDetails = require("../model/shoeDetails");
const CartItem = require("../model/cartItem");
const User = require("../model/user");
const addProduct = async (req, res) => {
  try {
    const {
      images,
      name,
      shoes_type,
      category,
      price,
      availableColors,
      availableSize,
      summary,
      productInformation,
    } = req.body;

    if (
      !images ||
      !name ||
      !shoes_type ||
      !category ||
      !price ||
      !availableColors ||
      !availableSize ||
      !summary ||
      !productInformation
    ) {
      return res.status(500).json("Fill all requierd Feild");
    }

    const shoeDetails = new ShoeDetails({
      images,
      name,
      shoes_type,
      category,
      price,
      availableColors,
      availableSize,
      summary,
      productInformation,
    });

    const product = await shoeDetails.save();

    if (!product) {
      return res.status(500).json("error in saving document");
    }
    return res.status(200).json(product);
  } catch (error) {
    console.error("error", error);
    return res(500).json("error in adding product");
  }
};

const fetchAllProduct = async (req, res) => {
  try {
    const allProduct = await ShoeDetails.find({});
    if (!allProduct) return res.status(404).json("data not found");
    return res.status(200).json(allProduct);
  } catch (error) {
    console.error("error", error);
    return res.statu(500).json("error in fetching all data");
  }
};

const addToCart = async (req, res) => {
  try {
    const { userId, productItemId, size, color, quantity, productPrice } =
      req.body;

    if (!productItemId || !size || !color || !quantity || !productPrice) {
      return res.status(500).json("All data are not selected");
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json("user not found");
    }

    let price = quantity * productPrice;
    const cartItemDetails = new CartItem({
      userId,
      productItemId,
      size,
      color,
      quantity,
      price,
    });

    const cartItem = await cartItemDetails.save();

    if (!cartItem) {
      return res.status(500).json("Error in add to cart");
    }

    await user.updateOne({
      $push: { cart: cartItem._id },
    });

    const response = {
      cartItem,
      user,
    };
    return res.status(200).json(response);
  } catch (error) {
    console.error("error", error);
    return res.status(500).json("catching error in add to cart");
  }
};

const fetchCartItems = async (req, res) => {
  try {
    const userId = req.params.id;

    console.log("userId", userId);

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json("user not found");
    }

    const allCartItem = await CartItem.find({ userId });

    return res.status(200).json(allCartItem);
  } catch (error) {
    console.error("error", error);
    return res.status(500).json("Catching feild fetch cart item request");
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const cartItemId = req.query.cartItemId;
    const userId = req.query.userId;

    const cartItem = await CartItem.findById(cartItemId);
    const user = await User.findById(userId);

    if (!cartItem || !user) {
      return res.status(404).json("cart Item not found");
    }

    const updatedUser = await user.updateOne({
      $pull: { cart: cartItem._id },
    });

    const deletedCartItem = await CartItem.deleteOne({ _id: cartItemId });

    const response = {
      deletedCartItem,
      updatedUser,
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error("error", error);
    return res.status(500).json("catching error at delete cart item");
  }
};

module.exports = {
  addProduct,
  fetchAllProduct,
  addToCart,
  fetchCartItems,
  deleteCartItem,
};

// const deleteCartItem = async (req, res) => {
//   try {
//   } catch (error) {
//     console.error("error", error);
//     return res.status(500).json("catching error at delete cart item");
//   }
// };
