import React, { useEffect, useState } from "react";
import { CircularProgress, InputAdornment, TextField } from "@mui/material";
import MetaData from "../../Layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { clearErrors, updatePassword } from "../../../Redux/Actions/userAction";
import { UPDATE_PASSWORD_RESET } from "../../../Redux/Constants/userConstants";
import Loader from "../../Layout/Loader";

const UpdatePassword = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully");

      navigate("/profile");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, alert, isUpdated, navigate]);

  const updatePasswordSubmit = (data) => {
    console.log("data:::", data);

    dispatch(updatePassword(data));
  };

  const onError = (errors) => console.log("Errors Occurred !! :", errors);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Change Password" />
          <div className="flex min-h-[calc(100vh-237px)] justify-center flex-col pb-5">
            <h3 className="pb-2 font-semibold text-xl sm:text-2xl text-[#03014C] flex justify-center ">
              Update Password
            </h3>
            <div className="mt-8 border bg-colorPale rounded-2xl p-5 sm:p-10 mx-[5%] sm:mx-[10%]">
              <form
                onSubmit={handleSubmit(updatePasswordSubmit, onError)}
                onReset={reset}
              >
                <div className="flex flex-col">
                  <div className="flex justify-center">
                    <div className="flex sm:block flex-col mb-5 w-[90%] md:w-5/6 lg:w-3/4">
                      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                        <VpnKeyIcon
                          sx={{ mr: 2, my: 0.5 }}
                          className="text-black"
                        />
                        <TextField
                          type={showOldPassword ? "text" : "password"}
                          id="input-with-sx"
                          label="oldPassword"
                          variant="standard"
                          className="w-full"
                          autoComplete="off"
                          {...register("oldPassword", {
                            required: "oldPassword is required",
                          })}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment
                                position="start"
                                className="cursor-pointer"
                                onClick={() =>
                                  setShowOldPassword((show) => !show)
                                }
                              >
                                {!showOldPassword ? (
                                  <VisibilityOffIcon />
                                ) : (
                                  <RemoveRedEyeIcon />
                                )}
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Box>
                      <div className="mt-2 ml-9">
                        {errors.oldPassword && (
                          <span style={{ color: "red" }} className="-mb-6">
                            {errors.oldPassword?.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="flex sm:block flex-col mb-5 w-[90%] md:w-5/6 lg:w-3/4">
                      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                        <LockIcon
                          sx={{ mr: 2, my: 0.5 }}
                          className="text-black"
                        />
                        <TextField
                          type={showNewPassword ? "text" : "password"}
                          id="input-with-sx"
                          label="newPassword"
                          variant="standard"
                          className="w-full"
                          autoComplete="off"
                          {...register("newPassword", {
                            required: "newPassword is required",
                          })}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment
                                position="start"
                                className="cursor-pointer"
                                onClick={() =>
                                  setShowNewPassword((show) => !show)
                                }
                              >
                                {!showNewPassword ? (
                                  <VisibilityOffIcon />
                                ) : (
                                  <RemoveRedEyeIcon />
                                )}
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Box>
                      <div className="mt-2 ml-9">
                        {errors.newPassword && (
                          <span style={{ color: "red" }} className="-mb-6">
                            {errors.newPassword?.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="flex sm:block flex-col mb-5 w-[90%] md:w-5/6 lg:w-3/4">
                      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                        <LockIcon
                          sx={{ mr: 2, my: 0.5 }}
                          className="text-black"
                        />
                        <TextField
                          type={showConfirmPassword ? "text" : "password"}
                          id="input-with-sx"
                          label="confirmPassword"
                          variant="standard"
                          className="w-full"
                          autoComplete="off"
                          {...register("confirmPassword", {
                            required: "confirmPassword is required",
                          })}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment
                                position="start"
                                className="cursor-pointer"
                                onClick={() =>
                                  setShowConfirmPassword((show) => !show)
                                }
                              >
                                {!showConfirmPassword ? (
                                  <VisibilityOffIcon />
                                ) : (
                                  <RemoveRedEyeIcon />
                                )}
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Box>
                      <div className="mt-2 ml-9">
                        {errors.confirmPassword && (
                          <span style={{ color: "red" }} className="-mb-6">
                            {errors.confirmPassword?.message}
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

export default UpdatePassword;
