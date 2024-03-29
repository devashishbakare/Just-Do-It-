import React, { useEffect, useState } from "react";
import style from "./productContainer.module.css";
import Product from "../Product/Product";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import baseUrl from "../Constant";
import Spinners from "../Spinners";
const ProductContainer = ({ appliedFilters }) => {
  const [storeProduct, setStoreProduct] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // fetching data for initial redering

  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const fetchAllProduct = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${baseUrl}/shoe/shopNow`, config);
        if (response.status === 200) {
          setStoreProduct(response.data);
          setProducts(response.data);
        }
      } catch (error) {
        toast.error("Something went wrong, try again later", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllProduct();
  }, []);

  //updating as user click on options
  useEffect(() => {
    const applyFilters = (filters) => {
      const genderFilter = new Set();
      const sportFilter = new Set();
      let priceFilter = 0;

      //fetching category wise details
      for (const sectionName in filters) {
        const options = filters[sectionName];

        if (sectionName === "gender") {
          for (const genderFlag of options) {
            if (genderFlag.checked === true) {
              genderFilter.add(genderFlag.name);
            }
          }
        }

        if (sectionName === "sport") {
          for (const sportFlag of options) {
            if (sportFlag.checked === true) {
              sportFilter.add(sportFlag.name);
            }
          }
        }

        if (sectionName === "price") {
          for (const priceFlag of options) {
            if (priceFlag.checked === true) {
              let stirngPriceRange = priceFlag.name;
              let priceRange = stirngPriceRange.split("-");
              if (priceRange[0] * 1000 >= priceFilter)
                priceFilter = priceRange[0] * 1000;
              if (priceRange[1] * 1000 >= priceFilter)
                priceFilter = priceRange[1] * 1000;
            }
          }
        }
      }

      let filtered = storeProduct;

      //filtering for gender
      if (genderFilter.size > 0) {
        filtered = storeProduct.filter((product) =>
          genderFilter.has(product.shoes_type)
        );
      }

      //filtering on category
      if (sportFilter.size > 0) {
        filtered = filtered.filter((product) => {
          return sportFilter.has(product.category);
        });
      }

      //filtering for price
      if (priceFilter > 0) {
        filtered = filtered.filter((product) => {
          return product.price <= priceFilter;
        });
      }

      setProducts(filtered);
    };

    applyFilters(appliedFilters);
  }, [appliedFilters, storeProduct]);

  // const { selectedGender } = useContext(shopContext);
  return (
    <div className={style.productListContainer}>
      {isLoading ? (
        <>
          <div className={style.centerSpinner}>
            <Spinners />
          </div>
        </>
      ) : (
        <>
          <div className={style.productWrapper}>
            {products.map((eachProduct) => (
              <Product key={eachProduct._id} props={eachProduct} />
            ))}
          </div>
        </>
      )}

      <ToastContainer />
    </div>
  );
};

export default ProductContainer;
