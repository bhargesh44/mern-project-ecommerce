import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  InputAdornment,
  TextField,
} from "@mui/material";
import MetaData from "../../Layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useForm } from "react-hook-form";
import { clearErrors, resetPassword } from "../../../Redux/Actions/userAction";
import { useNavigate, useParams } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";

import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Loader from "../../Layout/Loader";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );
  const { token } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/login");
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Password Updated Successfully");

      navigate("/login");
    }
  }, [dispatch, error, alert, success, navigate, isAuthenticated]);

  const resetPasswordSubmit = (data) => {
    console.log("data:::", data);
    dispatch(resetPassword(token, data));
  };

  const onError = (errors) => console.log("Errors Occurred !! :", errors);

  return (
    <>
      {loading ? (
        <Loader/>
      ) : (
        <>
          <MetaData title="Change Password" />
          <div className="flex min-h-[calc(100vh-237px)] justify-center flex-col pb-5">
            <h3 className="pb-2 font-semibold text-xl sm:text-2xl text-[#03014C] flex justify-center ">
              Update Password
            </h3>
            <div className="mt-8 border bg-colorPale rounded-2xl p-5 sm:p-10 mx-[5%] sm:mx-[10%]">
              <form
                onSubmit={handleSubmit(resetPasswordSubmit, onError)}
                onReset={reset}
              >
                <div className="flex flex-col">
                  <div className="flex justify-center">
                    <div className="flex sm:block flex-col mb-5 w-[90%] md:w-5/6 lg:w-3/4">
                      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                        <LockIcon
                          sx={{ mr: 2, my: 0.5 }}
                          className="text-black"
                        />
                        <TextField
                          type={showPassword ? "text" : "password"}
                          id="input-with-sx"
                          label="Password"
                          variant="standard"
                          className="w-full"
                          autoComplete="off"
                          {...register("password", {
                            required: "Password is required",
                          })}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment
                                position="start"
                                className="cursor-pointer"
                                onClick={() => setShowPassword((show) => !show)}
                              >
                                {!showPassword ? (
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
                        {errors.password && (
                          <span style={{ color: "red" }} className="-mb-6">
                            {errors.password?.message}
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
                      Reset Password
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

export default ResetPassword;
