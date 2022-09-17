import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Box, CircularProgress, TextField } from "@mui/material";
import MetaData from "../../Layout/MetaData";
import { useForm } from "react-hook-form";

import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";

import ProfilePng from "../../../Assets/Images/Profile.png";
import {
  clearErrors,
  loadUser,
  updateProfile,
} from "../../../Redux/Actions/userAction";
import { UPDATE_PROFILE_RESET } from "../../../Redux/Constants/userConstants";
import { useNavigate } from "react-router-dom";
import Loader from "../../Layout/Loader";

const UpdateProfile = () => {
  const [selectedImage, setSelectedImage] = useState();
  const [updateProfilePictureFile, setUpdateProfilePictureFile] = useState();

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  useEffect(() => {
    if (user) {
      setValue("name", user.name);
      setValue("email", user.email);
      setSelectedImage(user.avatar.url);
      getBase64FromUrl(user.avatar.url);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(loadUser());

      navigate("/profile");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, alert, user, setValue, isUpdated, navigate]);

  const updateProfileChange = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    reader.onloadend = () => {
      setSelectedImage(reader.result);
      setUpdateProfilePictureFile(reader.result);
    };
  };

  const getBase64FromUrl = async (url) => {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        resolve(base64data);
        setUpdateProfilePictureFile(base64data);
      };
    });
  };

  const Open = () => {
    document.getElementById("profile").click();
  };

  const updateProfileSubmit = (data) => {
    console.log("data:::", data);

    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("avatar", updateProfilePictureFile);

    dispatch(updateProfile(formData));
  };

  const onError = (errors) => console.log("Errors Occurred !! :", errors);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Update Profile" />
          <div className="flex min-h-[calc(100vh-237px)] justify-center flex-col pb-5">
            <h3 className="pb-2 font-semibold text-xl sm:text-2xl text-[#03014C] flex justify-center ">
              Update Profile
            </h3>

            <div className="mt-8 border bg-colorPale rounded-2xl p-10 mx-[5%] sm:mx-[10%]">
              <form
                onSubmit={handleSubmit(updateProfileSubmit, onError)}
                onReset={reset}
              >
                <div className="flex flex-col">
                  <div className="flex flex-col items-center justify-center">
                    <Avatar
                      src={selectedImage || ProfilePng}
                      alt="ProfilePng"
                      sx={{ width: 100, height: 100, cursor: "pointer" }}
                      onClick={() => Open()}
                    />
                  </div>

                  <div className="hidden">
                    <div className="flex sm:block flex-col mb-6 w-[90%] md:w-5/6 lg:w-3/4">
                      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                        <PersonIcon
                          sx={{ mr: 2, my: 0.5 }}
                          className="text-black"
                        />
                        <TextField
                          id="profile"
                          type="file"
                          label="Profile"
                          variant="standard"
                          className="w-full"
                          {...register("avatar", {
                            onChange: (e) => {
                              updateProfileChange(e);
                            },
                          })}
                        />
                      </Box>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="flex sm:block flex-col mb-6 mt-2 w-[90%] md:w-5/6 lg:w-3/4">
                      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                        <PersonIcon
                          sx={{ mr: 2, my: 0.5 }}
                          className="text-black"
                        />
                        <TextField
                          id="input-with-sx"
                          label="Name"
                          variant="standard"
                          className="w-full"
                          {...register("name", {
                            required: "Name is required",
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
                        <EmailIcon
                          sx={{ mr: 2, my: 0.5 }}
                          className="text-black"
                        />
                        <TextField
                          id="input-with-sx"
                          label="Email Address"
                          variant="standard"
                          className="w-full"
                          {...register("email", {
                            required: "Email is required",

                            pattern: {
                              value:
                                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                              message: "Please enter a valid email",
                            },
                          })}
                        />
                      </Box>
                      <div className="mt-2 ml-9">
                        {errors.email && (
                          <span style={{ color: "red" }} className="-mb-6">
                            {errors.email?.message}
                          </span>
                        )}
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
                      Update
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdateProfile;
