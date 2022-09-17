import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  NativeSelect,
  TextField,
} from "@mui/material";
import { useAlert } from "react-alert";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import MetaData from "../Layout/MetaData";
import AdminSidebar from "./AdminSidebar";
import MobileAdminSidebar from "./MobileAdminSidebar";

import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DescriptionIcon from "@mui/icons-material/Description";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import StorageIcon from "@mui/icons-material/Storage";
import {
  clearErrors,
  getProductDetails,
  updateProduct,
} from "../../Redux/Actions/productAction";
import { UPDATE_PRODUCT_RESET } from "../../Redux/Constants/productConstants";

const UpdateProduct = () => {
  const [oldImages, setOldImages] = useState([]);

  const [images, setImages] = useState([]);

  const [imagesPreview, setImagesPreview] = useState([]);
  const { error, product } = useSelector((state) => state.productDetails);
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);
  console.log(imagesPreview);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
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

  const { id } = useParams();

  useEffect(() => {
    if (product && product._id !== id) {
      dispatch(getProductDetails(id));
    } else {
      setValue("name", product.name);
      setValue("price", product.price);
      setValue("description", product.description);
      setValue("category", product.category);
      setValue("Stock", product.Stock);

      setOldImages(product.images);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Product Updated Successfully");
      navigate("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    isUpdated,
    product,
    updateError,
    id,
    setValue,
    navigate,
  ]);

  const updateProductSubmitHandler = (data) => {
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
    dispatch(updateProduct(id, myForm));
  };

  const onError = (errors) => console.log("Errors Occurred !! :", errors);

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

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
              Update Product
            </h3>
          </div>

          <div className="mt-8 border bg-colorPale rounded-2xl p-5 sm:p-10 lg:mx-[10%]">
            <form
              onSubmit={handleSubmit(updateProductSubmitHandler, onError)}
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

                      <FormControl variant="standard" className="w-full">
                        <InputLabel>Product Category</InputLabel>
                        <NativeSelect
                          {...register("category", {
                            required: "Product Category is required",
                          })}
                        >
                          {categories.map((cate) => (
                            <option key={cate} value={cate}>
                              {cate}
                            </option>
                          ))}
                        </NativeSelect>
                      </FormControl>
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
                          onChange: (e) => {
                            updateProductImagesChange(e);
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
                      {oldImages &&
                        oldImages.map((image, index) => (
                          <img
                            key={index}
                            src={image.url}
                            alt="Old Product Preview"
                            className="w-1/2 sm:w-full"
                          />
                        ))}
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
                    Update Product
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

export default UpdateProduct;
