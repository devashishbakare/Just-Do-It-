import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import style from "./profile.module.css";
import Spinners from "../Spinners";
import Sign_in_up from "../Sign_in_up/Sign_in_up";
import { useNavigate, Link } from "react-router-dom";
import baseUrl from "../Constant";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
export const Profile = () => {
  // fetching login status
  const LoginStatus = localStorage.getItem("isLoggedIn");
  const [showLoginForm, setShowLoginForm] = useState(
    LoginStatus === "false" ? false : true
  );

  //states
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [userDetails, setUserDetails] = useState({});
  const [orderDetails, setOrderDetails] = useState([]);
  const [updatePasswordClick, setUpdatePasswordClick] = useState(false);
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    newPassword: "",
    userImage: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleUploadPicture = async (picture) => {
    try {
      if (
        picture.type === "image/jpeg" ||
        picture.type === "image/jpg" ||
        picture.type === "image/png"
      ) {
        const data = new FormData();
        data.append("file", picture);
        data.append("upload_preset", "Social Media App");
        data.append("cloud_name", "djgouef8q");

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/djgouef8q/upload",
          {
            method: "post",
            body: data,
          }
        );
        const uploadedImageUrl = await response.json();
        console.log(uploadedImageUrl.url.toString());
        setCredentials({
          ...credentials,
          userImage: uploadedImageUrl.url.toString(),
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while uploading, Try again later", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const [displayMenu, setDisplayMenu] = useState(0);
  const menuColor = new Array(2).fill(false);
  menuColor[0] = true;
  const [colorSelected, setColorSelected] = useState(menuColor);

  const updateDisplayMenu = (menuIndex) => {
    let updatedColorArray = new Array(2).fill(false);
    updatedColorArray[menuIndex] = true;
    setColorSelected(updatedColorArray);
    setDisplayMenu(menuIndex);
  };

  //updating when user gets sign-in/up
  const handleLoginStatusUpdate = (status) => {
    setShowLoginForm(status);
  };

  useEffect(() => {
    const fetchUserAndOrderDetails = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        };
        const userResponse = await axios.get(
          `${baseUrl}/user/userDetails`,
          config
        );
        const orderResponse = await axios.get(
          `${baseUrl}/user/fetchOrders`,
          config
        );

        if (userResponse.status === 200 && orderResponse.status === 200) {
          setUserDetails(userResponse.data);
          setOrderDetails(orderResponse.data);
        } else {
          toast.error("Something went wrong, visit again later", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserAndOrderDetails();
  }, [showLoginForm]);

  const showOrderDetails = (order) => {
    navigate("/orderDetails", { state: order._id });
  };

  const handleSumbit = async () => {
    try {
      setIsLoading(true);
      const password = credentials.password;
      const newPassword = credentials.newPassword;

      if (
        (password === "" && newPassword !== "") ||
        (password !== "" && newPassword === "")
      ) {
        toast.error("Password or new Password can't be empty", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }

      if (password === newPassword) {
        toast.error("password and new password can't be same", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        `${baseUrl}/user/updateUser`,
        credentials,
        config
      );
      if (response.status === 200) {
        setUserDetails(response.data);
        setCredentials({
          name: "",
          email: "",
          password: "",
          newPassword: "",
          userImage: "",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, visit again later", {
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

  return (
    <>
      {showLoginForm === false ? (
        <>
          <div className={style.loginComponentWrapper}>
            <Sign_in_up updateChange={handleLoginStatusUpdate} />
          </div>
        </>
      ) : (
        <>
          {isLoading ? (
            <>
              <div className={style.centerSpinner}>
                <Spinners />
              </div>
            </>
          ) : (
            <>
              <div className={style.profilePageContainer}>
                <div className={style.navBarContainer}>
                  <Navbar />
                </div>
                <div className={style.profileContaintContainer}>
                  <div className={style.profileInfoContainer}>
                    <div className={style.profileInfoWrapper}>
                      <div className={style.userImageWrapper}>
                        <img
                          src={userDetails.userImage}
                          alt="profieImage"
                          className={style.profileImage}
                        />
                      </div>
                      <div className={style.userInfoTextWrapper}>
                        <span className={style.userNameText}>
                          {userDetails.name}
                        </span>
                        <span className={style.userEmailText}>
                          {userDetails.email}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={style.userCategoryContainer}>
                    <div className={style.userPersonaliseInfoContainer}>
                      <div className={style.topMenuWrapper}>
                        <span
                          className={`${style.menu} ${
                            colorSelected[0] ? style.selectedMenu : ""
                          }`}
                          onClick={() => updateDisplayMenu(0)}
                        >
                          Orders
                        </span>
                        <span
                          className={`${style.menu} ${
                            colorSelected[1] ? style.selectedMenu : ""
                          }`}
                          onClick={() => updateDisplayMenu(1)}
                        >
                          Edit Profile
                        </span>
                      </div>
                      <div className={style.menuOutputContainer}>
                        {/* Favorites */}
                        {displayMenu === 0 && (
                          <>
                            {orderDetails.length > 0 ? (
                              <>
                                <div className={style.ordersWrapper}>
                                  {orderDetails.map((order) => (
                                    <>
                                      <div
                                        className={style.orderSummeryContainer}
                                      >
                                        <div
                                          className={
                                            style.orderDetailsHeadingWrapper
                                          }
                                        >
                                          <div
                                            className={style.topRowAlignWrapper}
                                          >
                                            <span
                                              className={style.TopRowLeftFeild}
                                            >
                                              OrderDetails
                                            </span>
                                          </div>
                                          <span
                                            className={style.orderNavigation}
                                            onClick={() =>
                                              showOrderDetails(order)
                                            }
                                          >
                                            View Details
                                          </span>
                                        </div>
                                        <div className={style.dataWrapper}>
                                          <div
                                            className={style.nikeImageWrapper}
                                          >
                                            <img
                                              src="http://res.cloudinary.com/djgouef8q/image/upload/v1689941580/vlquytreyljotsbsdfms.jpg"
                                              alt="Nike Image"
                                              className={style.nikeProductImage}
                                            />
                                          </div>
                                          <div
                                            className={
                                              style.orderDetailsDataWrapper
                                            }
                                          >
                                            <div
                                              className={style.rowAlignWrapper}
                                            >
                                              <span
                                                className={
                                                  style.orderRowLeftFeild
                                                }
                                              >
                                                Date :
                                              </span>
                                              <span
                                                className={
                                                  style.orderRowrightFeild
                                                }
                                              >
                                                {" "}
                                                {order.createdAt.slice(0, 10)}
                                              </span>
                                            </div>
                                            <div
                                              className={style.rowAlignWrapper}
                                            >
                                              <span
                                                className={
                                                  style.orderRowLeftFeild
                                                }
                                              >
                                                Price :
                                              </span>
                                              <span
                                                className={
                                                  style.orderRowrightFeild
                                                }
                                              >
                                                {" "}
                                                {order.totalAmount} Rs
                                              </span>
                                            </div>
                                            <div
                                              className={style.rowAlignWrapper}
                                            >
                                              <span
                                                className={
                                                  style.orderRowLeftFeild
                                                }
                                              >
                                                Number Of Products :
                                              </span>
                                              <span
                                                className={
                                                  style.orderRowrightFeild
                                                }
                                              >
                                                {order.cartIds.length}
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  ))}
                                </div>
                              </>
                            ) : (
                              <>
                                <div className={style.noElementBlock}>
                                  You havn't added any order yet
                                </div>
                              </>
                            )}
                          </>
                        )}
                        {displayMenu === 1 && (
                          <>
                            <div className={style.editProfileFormContainer}>
                              <div className={style.editProfileFormWrapper}>
                                <div className={style.rowWrapper}>
                                  <span className={style.label}>Name</span>
                                  <span className={style.inputWrapper}>
                                    <input
                                      type="text"
                                      className={style.inputField}
                                      placeholder="Enter your name"
                                      name="name"
                                      value={credentials.name}
                                      onChange={handleChange}
                                    />
                                  </span>
                                </div>
                                <div className={style.rowWrapper}>
                                  <span className={style.label}>Email</span>
                                  <span className={style.inputWrapper}>
                                    <input
                                      type="text"
                                      className={style.inputField}
                                      placeholder="Enter your email"
                                      name="email"
                                      value={credentials.email}
                                      onChange={handleChange}
                                    />
                                  </span>
                                </div>
                                <div className={style.rowWrapper}>
                                  <span className={style.uploadPictureText}>
                                    Upload Picture
                                  </span>
                                  <span className={style.uploadPictureInput}>
                                    <input
                                      type="file"
                                      onChange={(e) =>
                                        handleUploadPicture(e.target.files[0])
                                      }
                                    />
                                  </span>
                                </div>

                                <div className={style.checkBoxWrapper}>
                                  <label className={style.checkBoxInput}>
                                    <input
                                      type="checkbox"
                                      checked={updatePasswordClick}
                                      onChange={() =>
                                        setUpdatePasswordClick(
                                          !updatePasswordClick
                                        )
                                      }
                                    />
                                    Update Password
                                  </label>
                                </div>
                                {updatePasswordClick && (
                                  <>
                                    <div className={style.rowWrapper}>
                                      <span className={style.label}>
                                        Password
                                      </span>
                                      <span className={style.inputWrapper}>
                                        <input
                                          type="password"
                                          className={style.inputField}
                                          placeholder="Enter your password"
                                          name="password"
                                          value={credentials.password}
                                          onChange={handleChange}
                                        />
                                      </span>
                                    </div>

                                    <div className={style.rowWrapper}>
                                      <span className={style.label}>
                                        New Password
                                      </span>
                                      <span className={style.inputWrapper}>
                                        <input
                                          type="password"
                                          className={style.inputField}
                                          placeholder="Confirm your password"
                                          name="newPassword"
                                          value={credentials.newPassword}
                                          onChange={handleChange}
                                        />
                                      </span>
                                    </div>
                                  </>
                                )}
                                <div className={style.updateProflieContainer}>
                                  <button
                                    className={style.updateProflieButton}
                                    onClick={handleSumbit}
                                  >
                                    Update Profile
                                  </button>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <ToastContainer />
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};
