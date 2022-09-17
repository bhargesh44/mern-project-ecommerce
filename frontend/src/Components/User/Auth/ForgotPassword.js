import React, { useEffect } from "react";
import { CircularProgress, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useAlert } from "react-alert";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../../Layout/MetaData";
import EmailIcon from "@mui/icons-material/Email";
import { clearErrors, forgotPassword } from "../../../Redux/Actions/userAction";
import { useNavigate } from "react-router-dom";
import Loader from "../../Layout/Loader";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const alert = useAlert();
  const { isAuthenticated } = useSelector((state) => state.user);

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/login");
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      alert.success(message);
    }
  }, [dispatch, error, alert, message, isAuthenticated, navigate]);

  const forgotPasswordSubmit = (data) => {
    console.log("data:::", data);
    dispatch(forgotPassword(data));
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
                onSubmit={handleSubmit(forgotPasswordSubmit, onError)}
                onReset={reset}
              >
                <div className="flex flex-col">
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
                      Send
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

export default ForgotPassword;
