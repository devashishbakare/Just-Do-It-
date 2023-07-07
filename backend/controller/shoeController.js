const ShoeDetails = require("../model/shoeDetails");
const CartItem = require("../model/cartItem");
const User = require("../model/user");
const FavoriteItem = require("../model/favoriteItem");

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

    const cartItems = await CartItem.find({ userId });

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
};
