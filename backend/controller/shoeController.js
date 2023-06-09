const ShoeDetails = require("../model/shoeDetails");
const CartItem = require("../model/cartItem");
const User = require("../model/user");
const FavoriteItem = require("../model/favoriteItem");
const Address = require("../model/address");
const Order = require("../model/order");
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

    if (
      !productItemId ||
      size === undefined ||
      color === undefined ||
      !quantity ||
      !productPrice
    ) {
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

    console.log("cart userId", userId);

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json("user not found");
    }

    const cartItems = await Promise.all(
      user.cart.map(async (cartId) => {
        return await CartItem.findById(cartId);
      })
    );

    const cart = [];

    const traverseWithPromise = await Promise.all(
      cartItems.map(async (cartItem) => {
        const cartProductDetails = await ShoeDetails.findById(
          cartItem.productItemId
        );

        const storePopulatedFeild = {
          cartItem,
          productDetails: cartProductDetails,
        };
        cart.push(storePopulatedFeild);
        return cartProductDetails;
      })
    );

    return res.status(200).json(cart);
  } catch (error) {
    console.error("error", error);
    return res.status(500).json("Catching feild fetch cart item request");
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const { userId, cartItemId } = req.body;

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

const addToFavorite = async (req, res) => {
  try {
    const { userId, productItemId, size, color, quantity, productPrice } =
      req.body;

    if (
      !productItemId ||
      size === undefined ||
      color === undefined ||
      !quantity ||
      !productPrice
    ) {
      return res.status(500).json("All data are not selected");
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json("user not found");
    }

    let price = quantity * productPrice;
    const favoriteItemDetails = new FavoriteItem({
      userId,
      productItemId,
      size,
      color,
      quantity,
      price,
    });

    const favoriteItem = await favoriteItemDetails.save();

    if (!favoriteItem) {
      return res.status(500).json("Error in add to favorite");
    }

    await user.updateOne({
      $push: { favorites: favoriteItem._id },
    });

    const response = {
      favoriteItem,
      user,
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error("error", error);
    return res.status(500).json("catching error in add to cart");
  }
};

const deleleFromFavorite = async (req, res) => {
  try {
    console.log(req.body);
    const { userId, favoriteItemId } = req.body;

    if (!userId || !favoriteItemId) {
      return res.status(500).json("insuffucient data to proceed");
    }

    const user = await User.findById(userId);
    const favoriteItem = await FavoriteItem.findById(favoriteItemId);

    if (!user || !favoriteItem) {
      return res.status(404).json("user or favoriteItem not found");
    }

    const deletedFavoriteItemFromUser = await user.updateOne({
      $pull: { favorites: favoriteItem._id },
    });

    const deletedStatus = await FavoriteItem.deleteOne(favoriteItem._id);

    const response = {
      deletedFavoriteItemFromUser,
      deletedStatus,
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error("error", error);
    return res.status(500).json("catching error at delete from favorite");
  }
};

const fetchFavorite = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log("userId", userId);
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json("user not found");
    }
    const allFavoriteItems = await FavoriteItem.find({ userId });

    const favoriteWithProduct = [];
    const products = await Promise.all(
      allFavoriteItems.map(async (favoriteItem) => {
        const productDetails = await ShoeDetails.findById(
          favoriteItem.productItemId
        );
        const newObj = {
          favoriteItemId: favoriteItem._id,
          shoeDetails: productDetails,
        };
        favoriteWithProduct.push(newObj);
        return productDetails;
      })
    );

    return res.status(200).json(favoriteWithProduct);
  } catch (error) {
    console.error("error", error);
    return res.status(500).json("catching error at fetching favorite");
  }
};

const fetchBasedOnType = async (req, res) => {
  try {
    const selectedOption = req.query.selectedOption;

    if (!selectedOption) {
      return res.status(500).json("selected option is empty");
    }

    const allDataBasedOnType = await ShoeDetails.find({
      shoes_type: selectedOption,
    });

    return res.status(200).json(allDataBasedOnType);
  } catch (error) {
    console.error("error", error);
    return res.status(500).json("catching error while fetching based on type");
  }
};

const fetchCategory = async (req, res) => {
  try {
    const selectedOption = req.query.selectedOption;

    if (!selectedOption) {
      return res.status(500).json("selected option is empty");
    }

    const allDataBasedOnCategory = await ShoeDetails.find({
      category: selectedOption,
    });

    return res.status(200).json(allDataBasedOnCategory);
  } catch (error) {
    console.error("error", error);
    return res.status(500).json("catching error fetching base on category");
  }
};

const searchProduct = async (req, res) => {
  try {
    let keyword = req.query.searchKey;
    console.log("keyword ", keyword);
    const allProductInfo = await ShoeDetails.find({
      name: { $regex: keyword, $options: "i" },
    });

    return res.status(200).json(allProductInfo);
  } catch (error) {
    console.error("error", error);
    return res.status(500).json("catching error while searching");
  }
};

const moveToCartFromFavorite = async (req, res) => {
  const { userId, favoriteItemId, productItemId } = req.body;

  console.log("suu " + req.body);
  const user = await User.findById(userId);
  const favoriteItem = await FavoriteItem.findById(favoriteItemId);

  if (!user || !favoriteItem) {
    return res.status(404).json("input not found");
  }

  const cartItemDetails = new CartItem({
    userId,
    productItemId,
    size: favoriteItem.size,
    color: favoriteItem.color,
    quantity: 1,
    price: favoriteItem.price,
  });

  const cartItem = await cartItemDetails.save();

  if (!cartItem) {
    return res.status(500).json("Error move to cart");
  }

  await user.updateOne({
    $push: { cart: cartItem._id },
  });

  const updatedFavorite = await FavoriteItem.deleteOne({ _id: favoriteItemId });

  const response = {
    cartItem,
    user,
    updatedFavorite,
  };
  return res.status(200).json(response);
};

const updateCartProductQuantity = async (req, res) => {
  const { userId, cartItemId, quantity } = req.body;

  try {
    const cartItem = await CartItem.findOneAndUpdate(
      { _id: cartItemId },
      { $set: { quantity: quantity } },
      { new: true }
    );

    if (!cartItem) {
      return res.status(404).json("CartId not found or error in updation");
    }

    const response = [];

    const productDetails = await ShoeDetails.findById(cartItem.productItemId);

    const storeObject = {
      cartItem,
      productDetails,
    };
    response.push(storeObject);

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json("error in updating quantity");
  }
};

const addAddress = async (req, res) => {
  const { country, fullName, mobileNumber, pincode, addressLine, landmark } =
    req.body;

  try {
    if (
      !country ||
      !fullName ||
      !mobileNumber ||
      !pincode ||
      !addressLine ||
      !landmark
    ) {
      return res.status(500).json("Address datails are not sufficient");
    }

    const saveAddress = new Address({
      country,
      fullName,
      mobileNumber,
      pincode,
      addressLine,
      landmark,
    });
    const address = await saveAddress.save();

    if (!address) {
      return res.status(500).json("Error while creating address");
    }
    return res.status(200).json(address._id);
  } catch (error) {
    console.log(error);
    return res.status("something went wrong in adding address");
  }
};

const placeOrder = async (req, res) => {
  const { userId, cartItemIds, addressId, paymentMethod, totalAmount } =
    req.body;

  try {
    if (
      !cartItemIds ||
      !userId ||
      !addressId ||
      !paymentMethod ||
      !totalAmount
    ) {
      return res.status(500).json("In-sufficient Data while placing order");
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json("user not found");
    }

    let cartIds = [];
    for (let index in cartItemIds) {
      let cartIdDetails = cartItemIds[index];
      cartIds.push(cartIdDetails.cartItem._id);
    }

    const saveOrder = new Order({
      userId,
      cartIds,
      address: addressId,
      paymentMethod,
      totalAmount,
    });

    const order = await saveOrder.save();

    const updatedUser = await user.updateOne(
      {
        $push: { orders: order._id },
      },
      { new: true }
    );

    return res.status(200).json(order._id);
  } catch (error) {
    console.log(error);
    return res.status(500).json("something went wrong with placing order");
  }
};
const deleteAllCartItem = async (req, res) => {
  try {
    const { userId } = req.body;
    console.log("users " + req.body.userId);

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json("user not found");
    }

    const status = await user.updateOne({ $set: { cart: [] } });

    await user.save();

    return res.status(200).json(status);
  } catch (error) {
    console.log(error, "error in deleting cartItme from user cart Array");
    return res.status(500).json("error in deleteing cart Item from user model");
  }
};

const fetchOrderDetails = async (req, res) => {
  try {
    const userId = req.query.userId;
    const orderId = req.query.orderId;
    console.log("userId " + userId + " orderId " + orderId);
    const order = await Order.findById(orderId);
    const user = await User.findById(userId);

    if (!order || !user) {
      return res.status(404).json("user of order not found");
    }
    const address = await Address.findById(order.address);
    const cartItemCollections = order.cartIds;
    const orderDetails = {
      address,
      totalAmount: order.totalAmount,
    };
    cartItemDetails = [];

    const cartItemInfo = await Promise.all(
      cartItemCollections.map(async (eachCartItem) => {
        const cartItem = await CartItem.findById(eachCartItem);
        const productInfo = await ShoeDetails.findById(cartItem.productItemId);
        const cartItemInfoCollections = {
          color: cartItem.color,
          size: cartItem.size,
          price: cartItem.price,
          quantity: cartItem.quantity,
          productInfo,
        };
        cartItemDetails.push(cartItemInfoCollections);
      })
    );
    const response = {
      orderDetails,
      cartItemDetails,
    };
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json("not able to fetch order details");
  }
};

const deleteOrder = async (req, res) => {
  try {
    let orderId = req.body.orderId;
    console.log(orderId + "orderId");
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json("order not found");
    }

    const deleteAddress = await Address.findByIdAndDelete(order.address);

    const user = await User.findById(order.userId);

    const updatedStatus = await user.updateOne({
      $pull: { orders: order._id },
    });

    const updatedOrder = await Order.findByIdAndDelete(orderId);

    return res.status(200).json({ updatedStatus, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json("something went wrong while deleting user");
  }
};

module.exports = {
  addProduct,
  fetchAllProduct,
  addToCart,
  fetchCartItems,
  deleteCartItem,
  addToFavorite,
  deleleFromFavorite,
  fetchFavorite,
  fetchBasedOnType,
  fetchCategory,
  searchProduct,
  moveToCartFromFavorite,
  updateCartProductQuantity,
  addAddress,
  placeOrder,
  deleteAllCartItem,
  fetchOrderDetails,
  deleteOrder,
};
