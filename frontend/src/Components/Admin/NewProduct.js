import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { Button, CircularProgress, MenuItem, TextField } from "@mui/material";
import { Box } from "@mui/system";
import MetaData from "../Layout/MetaData";
import AdminSidebar from "./AdminSidebar";
import MobileAdminSidebar from "./MobileAdminSidebar";
import { clearErrors, createProduct } from "../../Redux/Actions/productAction";
import { NEW_PRODUCT_RESET } from "../../Redux/Constants/productConstants";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DescriptionIcon from "@mui/icons-material/Description";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import StorageIcon from "@mui/icons-material/Storage";

const NewProduct = () => {
  const [images, setImages] = useState([]);

  const [imagesPreview, setImagesPreview] = useState([]);
  const navigate = useNavigate();

  console.log("imagesPreview", imagesPreview);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, success } = useSelector((state) => state.newProduct);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Product Created Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, success, navigate]);

  const createProductSubmitHandler = (data) => {
    console.log("data:::", data);

    const myForm = new FormData();

    myForm.append("name", data.name);
    myForm.append("price", data.price);
    myForm.append("description", data.description);
    myForm.append("category", data.category);
    myForm.append("Stock", data.Stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createProduct(myForm));
  };

  const onError = (errors) => console.log("Errors Occurred !! :", errors);

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImagesPreview((old) => [...old, reader.result]);
        setImages((old) => [...old, reader.result]);
      };
    });
  };

  return (
    <>
      <MetaData title="Create Product" />

      <div className="grid grid-cols-5">
        <div className="col-span-1 hidden lg:block">
          <AdminSidebar />
        </div>
        <div className="col-span-5 lg:col-span-4 bg-white p-5 sm:p-10">
          <div className="flex items-center mb-10">
            <MobileAdminSidebar />
            <h3 className="font-semibold w-full text-center text-2xl text-[tomato]">
              Create Product
            </h3>
          </div>

          <div className="mt-8 border bg-colorPale rounded-2xl p-5 sm:p-10 lg:mx-[10%]">
            <form
              onSubmit={handleSubmit(createProductSubmitHandler, onError)}
              onReset={reset}
            >
              <div className="flex flex-col">
                <div className="flex  justify-center">
                  <div className="flex sm:block flex-col mb-6 w-[90%] md:w-5/6 lg:w-3/4">
                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                      <SpellcheckIcon
                        sx={{ mr: 2, my: 0.5 }}
                        className="text-black"
                      />
                      <TextField
                        id="input-with-sx"
                        label="Product Name"
                        variant="standard"
                        className="w-full"
                        {...register("name", {
                          required: "Product Name is required",
                        })}
                      />
                    </Box>
                    <div className="mt-2 ml-9">
                      {errors.name && (
                        <span style={{ color: "red" }} className="-mb-6">
                          {errors.name?.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex  justify-center">
                  <div className="flex sm:block flex-col mb-6 w-[90%] md:w-5/6 lg:w-3/4">
                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                      <AttachMoneyIcon
                        sx={{ mr: 2, my: 0.5 }}
                        className="text-black"
                      />
                      <TextField
                        id="input-with-sx"
                        label="Product Price"
                        variant="standard"
                        className="w-full"
                        type="number"
                        {...register("price", {
                          required: "Product Price is required",
                        })}
                      />
                    </Box>
                    <div className="mt-2 ml-9">
                      {errors.price && (
                        <span style={{ color: "red" }} className="-mb-6">
                          {errors.price?.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex  justify-center">
                  <div className="flex sm:block flex-col mb-6 w-[90%] md:w-5/6 lg:w-3/4">
                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                      <DescriptionIcon
                        sx={{ mr: 2, my: 0.5 }}
                        className="text-black"
                      />
                      <TextField
                        id="input-with-sx"
                        label="Product Description"
                        variant="standard"
                        className="w-full"
                        {...register("description", {
                          required: "Product Description is required",
                        })}
                      />
                    </Box>
                    <div className="mt-2 ml-9">
                      {errors.description && (
                        <span style={{ color: "red" }} className="-mb-6">
                          {errors.description?.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="flex sm:block flex-col mb-5 w-[90%] md:w-5/6 lg:w-3/4">
                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                      <AccountTreeIcon
                        sx={{ mr: 2, my: 0.5 }}
                        className="text-black"
                      />
                      <TextField
                        select
                        id="input-with-sx"
                        label="Product Category"
                        variant="standard"
                        className="w-full"
                        {...register("category", {
                          required: "Product Category is required",
                        })}
                      >
                        {categories.map((cate) => (
                          <MenuItem key={cate} value={cate}>
                            {cate}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Box>
                    <div className="mt-2 ml-9">
                      {errors.category && (
                        <span style={{ color: "red" }} className="-mb-6">
                          {errors.category?.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex  justify-center">
                  <div className="flex sm:block flex-col mb-6 w-[90%] md:w-5/6 lg:w-3/4">
                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                      <StorageIcon
                        sx={{ mr: 2, my: 0.5 }}
                        className="text-black"
                      />
                      <TextField
                        id="input-with-sx"
                        label="Product Stock"
                        variant="standard"
                        className="w-full"
                        type="number"
                        {...register("Stock", {
                          required: "Product Stock is required",
                        })}
                      />
                    </Box>
                    <div className="mt-2 ml-9">
                      {errors.Stock && (
                        <span style={{ color: "red" }} className="-mb-6">
                          {errors.Stock?.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex  justify-center">
                  <div className="flex sm:block flex-col mb-6 w-[90%] md:w-5/6 lg:w-3/4">
                    <Button
                      variant="contained"
                      component="label"
                      className="w-full !capitalize !bg-gray-500 !rounded-3xl"
                    >
                      Choose Product Images
                      <input
                        type="file"
                        hidden
                        multiple
                        accept="image/*"
                        {...register("image", {
                          required: "Product Image is required",
                          onChange: (e) => {
                            createProductImagesChange(e);
                          },
                        })}
                      />
                    </Button>

                    <div className="mt-2 ml-9">
                      {errors.image && (
                        <span style={{ color: "red" }} className="-mb-6">
                          {errors.image?.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex  justify-center">
                  <div className="flex sm:block flex-col mb-6 w-[90%] md:w-5/6 lg:w-3/4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center">
                      {imagesPreview.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt="Product Preview"
                          className="w-1/2 sm:w-full"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-center ">
                  <button
                    type="submit"
                    className="bg-[#eb4034] hover:bg-[#eb4034] text-gray-100 p-4 w-[90%] md:w-5/6 lg:w-3/4 rounded-xl tracking-wide
                    font-semibold font-display focus:outline-none focus:shadow-outline 
                    shadow-lg flex items-center justify-center"
                  >
                    {loading && (
                      <CircularProgress
                        size={20}
                        sx={{ color: "white", mr: 2 }}
                      />
                    )}
                    Create Product
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewProduct;
