import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import InputAdornment from "@mui/material/InputAdornment";
import { useForm } from "react-hook-form";
import { CircularProgress, TextField } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "../../../Redux/Actions/userAction";
import { useAlert } from "react-alert";
import MetaData from "../../Layout/MetaData";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const onSubmit = (data) => {
    console.log("data:::", data);
    dispatch(login(data.email, data.password));
  };

  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/profile";

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [dispatch, error, alert, isAuthenticated, navigate, redirect]);

  const onError = (errors) => console.log("Errors Occurred !! :", errors);

  return (
    <>
      <MetaData title="Login" />
      <div className="flex min-h-[calc(100vh-237px)] justify-center flex-col pb-5">
        <h3 className="pb-2 font-semibold text-xl sm:text-2xl text-[#03014C] flex justify-center ">
          Login to your account!
        </h3>

        <div className="mt-8 border bg-colorPale rounded-2xl p-5 sm:p-10 mx-[5%] sm:mx-[10%]">
          <form onSubmit={handleSubmit(onSubmit, onError)} onReset={reset}>
            <div className="flex flex-col">
              <div className="flex  justify-center">
                <div className="flex sm:block flex-col mb-6 w-[90%] md:w-5/6 lg:w-3/4">
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <EmailIcon sx={{ mr: 2, my: 0.5 }} className="text-black" />
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
                    <LockIcon sx={{ mr: 2, my: 0.5 }} className="text-black" />
                    <TextField
                      type={showPassword ? "text" : "password"}
                      id="input-with-sx"
                      label="Password"
                      variant="standard"
                      className="w-full"
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

              <div className="flex justify-center ">
                <div className="flex justify-end mb-6 sm:mb-8 w-[90%] md:w-5/6 lg:w-3/4">
                  <Link to="/password/forgot">
                    <span className="text-[#eb4034] ml-auto opacity-50 cursor-pointer">
                      Forgot Password?
                    </span>
                  </Link>
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
                  Login to Continue
                </button>
              </div>
            </div>
          </form>

          <div className="flex justify-center">
            <div className="flex justify-center sm:justify-between items-center mb-6  w-full md:w-5/6 lg:w-3/4 mt-6 sm:mt-8  text-center">
              <div className="ml-0 sm:ml-auto">
                <span className="text-black">Don't have an account ?</span>
                <Link
                  to="/signup"
                  className="cursor-pointer text-[#eb4034] ml-1 font-bold"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
