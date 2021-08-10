import React from "react";
import { PayPalButton } from "react-paypal-button-v2";

const PayPalBtn = (props) => {
  const {
    amount,
    currency,
    createSubscription,
    onApprove,
    catchError,
    onError,
    onCancel,
  } = props;
  //CLient ID
  const paypalKey =
    "Aa1hHDkEgGp1zJfB9rEDy2-0ow2pju03oVh5CNVD_Rmkq5v0dAY2tTjJso8_cIvKzZs6wIR8eaTCFCGO";
  return (
    <PayPalButton
      amount={amount}
      currency={currency}
      createSubscription={(data, details) => createSubscription(data, details)}
      onApprove={(data, details) => onApprove(data, details)}
      onError={(err) => onError(err)}
      catchError={(err) => catchError(err)}
      onCancel={(err) => onCancel(err)}
      options={{
        clientId: paypalKey,
        vault: true,
      }}
      style={{
        shape: "rect",
        color: "blue",
        layout: "horizontal",
        label: "subscribe",
      }}
    />
  );
};

export default PayPalBtn;
