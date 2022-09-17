import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../Layout/MetaData";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Box, MenuItem, TextField } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PinDropIcon from "@mui/icons-material/PinDrop";
import PhoneIcon from "@mui/icons-material/Phone";
import PublicIcon from "@mui/icons-material/Public";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import { Country, State } from "country-state-city";
import CheckOutSteps from "./CheckOutSteps";
import { saveShippingInfo } from "../../Redux/Actions/cartAction";

const Shipping = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { shippingInfo } = useSelector((state) => state.cart);

  const [country, setCountry] = useState(shippingInfo.country);
  const [state, setState] = useState(shippingInfo.state);

  const shippingSubmit = (data) => {
    dispatch(saveShippingInfo(data));
    navigate("/order/confirm");
  };
  const onError = (errors) => console.log("Errors Occurred !! :", errors);

  useEffect(() => {
    if (shippingInfo) {
      setValue("address", shippingInfo.address);
      setValue("city", shippingInfo.city);
      setValue("pinCode", shippingInfo.pinCode);
      setValue("phoneNo", shippingInfo.phoneNo);
    }
  }, [setValue, shippingInfo]);

  return (
    <>
      <MetaData title="Shipping Details" />
      <CheckOutSteps activeStep={0} />
      <div className="flex min-h-[calc(100vh-301px)] justify-center flex-col py-5">
        <h3 className="pb-2 font-semibold text-xl sm:text-2xl text-[#03014C] flex justify-center ">
          Shipping Details
        </h3>

        <div className="mt-8 border bg-colorPale rounded-2xl p-5 sm:p-10 mx-[5%] sm:mx-[10%]">
          <form
            onSubmit={handleSubmit(shippingSubmit, onError)}
            onReset={reset}
          >
            <div className="flex flex-col">
              <div className="flex  justify-center">
                <div className="flex sm:block flex-col mb-6 w-[90%] md:w-5/6 lg:w-3/4">
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <HomeIcon sx={{ mr: 2, my: 0.5 }} className="text-black" />
                    <TextField
                      id="input-with-sx"
                      label="Address"
                      variant="standard"
                      className="w-full"
                      {...register("address", {
                        required: "Address is required",
                      })}
                    />
                  </Box>
                  <div className="mt-2 ml-9">
                    {errors.address && (
                      <span style={{ color: "red" }} className="-mb-6">
                        {errors.address?.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="flex sm:block flex-col mb-5 w-[90%] md:w-5/6 lg:w-3/4">
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <LocationCityIcon
                      sx={{ mr: 2, my: 0.5 }}
                      className="text-black"
                    />
                    <TextField
                      id="input-with-sx"
                      label="City"
                      variant="standard"
                      className="w-full"
                      {...register("city", {
                        required: "City is required",
                      })}
                    />
                  </Box>
                  <div className="mt-2 ml-9">
                    {errors.city && (
                      <span style={{ color: "red" }} className="-mb-6">
                        {errors.city?.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="flex sm:block flex-col mb-5 w-[90%] md:w-5/6 lg:w-3/4">
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <PinDropIcon
                      sx={{ mr: 2, my: 0.5 }}
                      className="text-black"
                    />
                    <TextField
                      type="number"
                      id="input-with-sx"
                      label="Pin Code"
                      variant="standard"
                      className="w-full"
                      {...register("pinCode", {
                        required: "Pin Code is required",
                      })}
                    />
                  </Box>
                  <div className="mt-2 ml-9">
                    {errors.pinCode && (
                      <span style={{ color: "red" }} className="-mb-6">
                        {errors.pinCode?.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="flex sm:block flex-col mb-5 w-[90%] md:w-5/6 lg:w-3/4">
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <PhoneIcon sx={{ mr: 2, my: 0.5 }} className="text-black" />
                    <TextField
                      type="number"
                      id="input-with-sx"
                      label="Phone Number"
                      variant="standard"
                      className="w-full"
                      {...register("phoneNo", {
                        required: "Phone Number is required",
                        minLength: {
                          value: 10,
                          message: "Phone Number must be 10 numbers",
                        },
                        maxLength: {
                          value: 10,
                          message: "Phone Number must be 10 numbers",
                        },
                      })}
                    />
                  </Box>
                  <div className="mt-2 ml-9">
                    {errors.phoneNo && (
                      <span style={{ color: "red" }} className="-mb-6">
                        {errors.phoneNo?.message}
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
                    <TextField
                      select
                      value={country}
                      id="input-with-sx"
                      label="Country"
                      variant="standard"
                      className="w-full"
                      {...register("country", {
                        required: "Country is required",
                        onChange: (e) => {
                          setCountry(e.target.value);
                        },
                      })}
                    >
                      {Country &&
                        Country.getAllCountries().map((item) => (
                          <MenuItem key={item.isoCode} value={item.isoCode}>
                            {item.name}
                          </MenuItem>
                        ))}
                    </TextField>
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

              {country && (
                <div className="flex justify-center">
                  <div className="flex sm:block flex-col mb-5 w-[90%] md:w-5/6 lg:w-3/4">
                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                      <TransferWithinAStationIcon
                        sx={{ mr: 2, my: 0.5 }}
                        className="text-black"
                      />
                      <TextField
                        select
                        id="input-with-sx"
                        label="State"
                        variant="standard"
                        className="w-full"
                        value={state}
                        {...register("state", {
                          required: "State is required",
                          onChange: (e) => {
                            setState(e.target.value);
                          },
                        })}
                      >
                        {State &&
                          State.getStatesOfCountry(country).map((item) => (
                            <MenuItem key={item.isoCode} value={item.isoCode}>
                              {item.name}
                            </MenuItem>
                          ))}
                      </TextField>
                    </Box>
                    <div className="mt-2 ml-9">
                      {errors.state && (
                        <span style={{ color: "red" }} className="-mb-6">
                          {errors.state?.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-center ">
                <button
                  type="submit"
                  className="bg-[#eb4034] hover:bg-[#eb4034] text-gray-100 p-4 w-[90%] md:w-5/6 lg:w-3/4 rounded-xl tracking-wide
                  font-semibold font-display focus:outline-none focus:shadow-outline 
                  shadow-lg flex items-center justify-center"
                >
                  Continue
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Shipping;
