import React from "react";
import PayPalBtn from "./PayPalBtn";

const PayPal = () => {
  const paypalSubscribe = (data, actions) => {
    return actions.subscription.create({
      plan_id: "P-5A085181AT0150813MEIHYHI",
    });
  };

  const paypalOnError = (err) => {
    console.log("Error");
  };

  const paypalOnApprove = (data, detail) => {
    // call the backend api to store transaction details
    console.log("Payapl approved");
    console.log(data.subscriptionID);
  };

  return (
    <div>
      <PayPalBtn
        amount="4.00"
        currency="USD"
        createSubscription={paypalSubscribe}
        onApprove={paypalOnApprove}
        catchError={paypalOnError}
        onError={paypalOnError}
        onCancel={paypalOnError}
      />
    </div>
  );
};

export default PayPal;
