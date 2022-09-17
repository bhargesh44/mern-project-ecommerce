import React from "react";
import { Step, StepLabel, Stepper, Typography } from "@mui/material";

import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

const CheckOutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <LocalShippingIcon />,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <LibraryAddCheckIcon />,
    },
    {
      label: <Typography>Payment</Typography>,
      icon: <AccountBalanceIcon />,
    },
  ];
  return (
    <Stepper
      className="bg-transparent box-border"
      activeStep={activeStep}
      alternativeLabel
    >
      {steps.map((step, index) => (
        <Step key={index}>
          <StepLabel
            style={{
              color: activeStep >= index ? "tomato" : "rgba(0, 0, 0, 0.649)",
            }}
            icon={step.icon}
          >
            {step.label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default CheckOutSteps;
