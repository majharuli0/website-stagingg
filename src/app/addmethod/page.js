"use client";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Load your publishable key
const stripePromise = loadStripe(
  "pk_live_51QASgrG2eKiLhL9BrtG35rD3qh640iV7sclihskPlbQx3QAPHBkHZ8Hgx9pnh4IDJyf7o7QuU9T1DwhHGcuPJ4tC00dGB55dO2"
  // "pk_test_51Q5RdFGPITMkDJgUOb2iZNW2Y3MLWkIxYR06qC6Oww5ZyvYGJhqz8Cato4ggjhBpyC0iphT42LPT2tMGNljlzT2V00vE2KnUBP"
);

const AddPaymentMethod = () => {
  const stripe = useStripe();
  const elements = useElements();
  const customerId = "cus_R3JjtlL7vYXFhe"; // Replace with actual customer ID

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error(error);
    } else {
      // Send payment method to backend
      try {
        const response = await fetch(
          "https://www.api.elderlycareplatform.com/api/v1/orders/add-payment-method",
          // "https://www.backend.elderlycareplatform.com/api/v1/orders/add-payment-method",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // 'Authorization': `Bearer ${yourAccessToken}` // Add authorization token if required
            },
            body: JSON.stringify({
              customerId: customerId,
              paymentMethodId: paymentMethod.id,
            }),
          }
        );

        const result = await response.json();
        if (response.ok) {
          alert("Payment method added successfully!");
        } else {
          alert("Failed to add payment method: " + result.message);
        }
      } catch (error) {
        console.error("Error adding payment method:", error);
      }
    }
  };

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
      },
    },
  };

  return (
    <div
      style={{
        width: "700px",
        height: "400px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <CardElement
          options={{ ...cardStyle, hidePostalCode: true }}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            height: "45px",
          }}
        />
        <button
          type="submit"
          disabled={!stripe}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            width: "100%",
            backgroundColor: "#6772e5",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Add Payment Method
        </button>
      </form>
    </div>
  );
};

const App = () => (
  <Elements stripe={stripePromise}>
    <AddPaymentMethod />
  </Elements>
);

export default App;
