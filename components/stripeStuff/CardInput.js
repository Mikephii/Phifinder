import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
const cardStyle = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: "Roboto, sans-serif",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#32325d",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

const CardInput = () => {
  return (
    <Card style={{ backgroundColor: "white" }}>
      <CardContent>
        <CardElement options={cardStyle} />
      </CardContent>
    </Card>
  );
};

export default CardInput;
