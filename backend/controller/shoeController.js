const ShoeDetails = require("../model/shoeDetails");
const CartItem = require("../model/cartItem");
const User = require("../model/user");
const FavoriteItem = require("../model/favoriteItem");
const Address = require("../model/address");
const Order = require("../model/order");
const nodeMailerController = require("../controller/nodeMailerController");
const mongoose = require("mongoose");
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
    const { productItemId, size, color, quantity, productPrice } = req.body;

    const userId = req.userId;

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

    let isPresent = false;
    const userCartItems = await Promise.all(
      user.cart.map(async (cartId) => {
        const cartItemDetails = await CartItem.findById(cartId);
        if (
          cartItemDetails &&
          cartItemDetails.productItemId === productItemId &&
          cartItemDetails.size === size
        ) {
          isPresent = true;
        }
        return cartItemDetails;
      })
    );
    if (isPresent === true) {
      return res.status(200).json("already present");
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
    const userId = req.userId;

    // console.log("cart userId", userId);

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
    const userId = req.userId;
    const { cartItemId } = req.body;

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
    const { productItemId, size, color, quantity, productPrice } = req.body;

    const userId = req.userId;
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
    let isPresent = false;
    const userFavoriteItems = await Promise.all(
      user.favorites.map(async (favoriteId) => {
        const favoriteItemDetails = await FavoriteItem.findById(favoriteId);
        if (
          favoriteItemDetails &&
          favoriteItemDetails.productItemId === productItemId &&
          favoriteItemDetails.size === size
        ) {
          isPresent = true;
        }
        return favoriteItemDetails;
      })
    );
    if (isPresent === true) {
      return res.status(200).json("already present");
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
    return res.status(500).json("catching error in add to favorite");
  }
};

const deleleFromFavorite = async (req, res) => {
  try {
    const userId = req.userId;
    const { favoriteItemId } = req.body;

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
    const userId = req.userId;
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
    const { searchKey, page, pageSize } = req.query;
    const currentPage = parseInt(page) || 1;
    const itemsPerPage = parseInt(pageSize) || 5;

    const skip = (currentPage - 1) * itemsPerPage;

    const regex = new RegExp(searchKey, "i");
    const data = await ShoeDetails.find({ name: regex })
      .skip(skip)
      .limit(itemsPerPage);

    const totalResults = await ShoeDetails.countDocuments({ name: regex });

    res.status(200).json({
      data,
      totalPages: Math.ceil(totalResults / itemsPerPage),
    });
  } catch (error) {
    console.error("Error fetching search results:", error);
    res.status(500).json("Error in fetching data");
  }
};

const moveToCartFromFavorite = async (req, res) => {
  const userId = req.userId;
  const { favoriteItemId, productItemId } = req.body;
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
  const cartCount = user.cart.length + 1;
  const response = {
    cartCount,
  };
  return res.status(200).json(response);
};

const updateCartProductQuantity = async (req, res) => {
  const { cartItemId, quantity } = req.body;

  const userId = req.userId;
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
  const userId = req.userId;
  // console.log("userId in placeOrder " + userId);
  const { cartItemIds, addressId, paymentMethod, totalAmount } = req.body;
  console.log("payment method ", paymentMethod);

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

    //sending mail to user on placing order
    const dataForMail = {
      name: user.name,
      size: order.cartIds.length,
      totalAmount: order.totalAmount,
    };
    nodeMailerController.sendMailOnPlaceOrder(dataForMail, user.email);

    console.log("mail data ", dataForMail);

    return res.status(200).json(order._id);
  } catch (error) {
    console.log(error);
    return res.status(500).json("something went wrong with placing order");
  }
};
const deleteAllCartItem = async (req, res) => {
  try {
    const userId = req.userId;

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
    const userId = req.userId;

    const orderId = req.params.id;
    // console.log("userId in details " + userId + " orderId " + orderId);
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
      paymentMethod: order.paymentMethod,
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
    const { orderId } = req.body;
    const userId = req.userId;
    // console.log(orderId + "orderId");
    const order = await Order.findById(orderId);
    const user = await User.findById(userId);
    if (!order || !user) {
      return res.status(404).json("order not found");
    }

    // sending mail to user on cancelling order
    const dataForMail = {
      name: user.name,
      size: order.cartIds.length,
      totalAmount: order.totalAmount,
    };
    nodeMailerController.sendMailOnCancleOrder(dataForMail, user.email);

    const deleteAddress = await Address.findByIdAndDelete(order.address);

    const deleteCartItemStatus = await Promise.all(
      order.cartIds.map(async (cartId) => {
        return await CartItem.findByIdAndDelete(cartId);
      })
    );

    const updatedOrder = await Order.findByIdAndDelete(orderId);

    const updatedStatus = await user.updateOne({
      $pull: { orders: order._id },
    });

    return res.status(200).json({ updatedStatus, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json("something went wrong while deleting user");
  }
};

const placeOrderTemplate = async (req, res) => {
  const data = await fetchDetailsToSendInMail(
    "64ba71c164047feca181964d",
    "64c20a3cf7e3b645a91e07b8"
  );
  // console.log("here is data " + data);
  return res.render("placeOrder", {
    title: "Incident Details",
    orders: data,
  });
};

const fetchDetailsToSendInMail = async (userId, orderId) => {
  try {
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
      date: order.createdAt,
      size: 0,
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
    orderDetails.size = cartItemDetails.length;
    const response = {
      orderDetails,
      cartItemDetails,
    };
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const clearCart = async (req, res) => {
  try {
    const response = await CartItem.deleteMany({});
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json("something went wrong");
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
  placeOrderTemplate,
  clearCart,
};
