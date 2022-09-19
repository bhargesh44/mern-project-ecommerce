import React, { useEffect } from "react";
import Loader from "../Layout/Loader";
import MetaData from "../Layout/MetaData";
import AdminSidebar from "./AdminSidebar";
import MobileAdminSidebar from "./MobileAdminSidebar";

import Box from "@mui/material/Box";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  CircularProgress,
  FormControl,
  InputLabel,
  NativeSelect,
  TextField,
} from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
  clearErrors,
  getUserDetails,
  updateUser,
} from "../../Redux/Actions/userAction";
import { UPDATE_USER_RESET } from "../../Redux/Constants/userConstants";

const UpdateUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, user } = useSelector((state) => state.userDetails);

  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    if (user && user._id !== id) {
      dispatch(getUserDetails(id));
    } else {
      setValue("name", user.name);
      setValue("email", user.email);
      setValue("role", user.role);
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
      alert.success("User Updated Successfully");
      navigate("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    isUpdated,
    updateError,
    user,
    id,
    navigate,
    setValue,
  ]);

  const updateUserSubmitHandler = (data) => {
    console.log(data);

    dispatch(updateUser(id, data));
  };
  const onError = (errors) => console.log("Errors Occurred !! :", errors);

  return (
    <>
      <MetaData title="Update User" />

      <div className="grid grid-cols-5">
        <div className="col-span-1 hidden lg:block">
          <AdminSidebar />
        </div>
        <div className="col-span-5 lg:col-span-4 bg-white p-5 sm:p-10">
          {loading ? (
            <Loader />
          ) : (
            <>
              <div className="flex items-center mb-10 justify-between">
                <MobileAdminSidebar />
                <h3 className="font-semibold text-center text-base sm:text-2xl text-[tomato] w-full items-center">
                  Update User
                </h3>
              </div>

              <div className="mt-8 border bg-colorPale rounded-2xl p-5 sm:p-10 mx-[5%] sm:mx-[10%]">
                <form
                  onSubmit={handleSubmit(updateUserSubmitHandler, onError)}
                  onReset={reset}
                >
                  <div className="flex flex-col">
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

                    <div className="flex justify-center">
                      <div className="flex sm:block flex-col mb-5 w-[90%] md:w-5/6 lg:w-3/4">
                        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                          <PublicIcon
                            sx={{ mr: 2, my: 0.5 }}
                            className="text-black"
                          />

                          <FormControl variant="standard" className="w-full">
                            <InputLabel>User Role</InputLabel>
                            <NativeSelect
                              {...register("role", {
                                required: "Users Role is required",
                              })}
                            >
                              <option value="admin">Admin</option>
                              <option value="user">User</option>
                            </NativeSelect>
                          </FormControl>
                        </Box>
                        <div className="mt-2 ml-9">
                          {errors.country && (
                            <span style={{ color: "red" }} className="-mb-6">
                              {errors.country?.message}
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
                        {updateLoading && (
                          <CircularProgress
                            size={20}
                            sx={{ color: "white", mr: 2 }}
                          />
                        )}
                        Continue
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UpdateUser;
