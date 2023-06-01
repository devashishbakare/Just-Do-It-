import React, { useContext, useEffect, useState } from "react";
import style from "./productContainer.module.css";
import Product from "../Product/Product";
import axios from "axios";
import shopContext from "../../Context /ShopContext";
import baseUrl from "../Constant";
const ProductContainer = () => {
  const [storeProduct, setStoreProduct] = useState([]);
  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const fetchAllProduct = async () => {
      const response = await axios.get(`${baseUrl}/shoe/shopNow`, config);
      console.log(response.data);
      setStoreProduct(response.data);
    };

    fetchAllProduct();
  }, []);

  const { selectedGender } = useContext(shopContext);
  return (
    <div className={style.productListContainer}>
      {selectedGender.length === 0 && (
        <div className={style.productWrapper}>
          {storeProduct.map((eachProduct) => (
            <Product key={eachProduct._id} props={eachProduct} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductContainer;
