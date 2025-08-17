"use client";

import { Button } from "@/components";
import { useAuth } from "@/context/AuthContext";
import { useUserService } from "@/services/userService";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Calendar, CreditCard, Lock } from "lucide-react";
import { useState } from "react";
import "./style.css";
import { toast } from "react-toastify";

const stripePromise = loadStripe(
  "pk_test_51QASgrG2eKiLhL9BNwOGXIQOoke6EAZbm28ysR5hZeBf1IF7bnfEi0BFah2DlBwgXDml4kHXQSm4ffq6CN8ZK7cZ00uqC8MaKH"
  // "pk_live_51QASgrG2eKiLhL9BrtG35rD3qh640iV7sclihskPlbQx3QAPHBkHZ8Hgx9pnh4IDJyf7o7QuU9T1DwhHGcuPJ4tC00dGB55dO"
);

const AddPaymentMethod = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { customerMail } = useAuth();
  const { getCustomerId } = useUserService();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!stripe || !elements) {
      setIsLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });
    if (error) {
      setError(error.message);
      setIsLoading(false);
    } else {
      let stripeCustomerId;
      try {
        const customerData = await getCustomerId(customerMail);
        stripeCustomerId = customerData.id;
        const response = await fetch(
          "https://backend.elderlycareplatform.com/api/v1/orders/add-payment-method",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              customerId: stripeCustomerId,
              paymentMethodId: paymentMethod.id,
            }),
          }
        );

        const result = await response.json();
        if (response.ok) {
          toast.success("Payment method added successfully");
          window.location.reload();
        } else {
          setError("Failed to add payment method: " + result.message);
        }
      } catch (error) {
        setError("Error adding payment method: " + error.message);
      }
      setIsLoading(false);
    }
  };

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <form onSubmit={handleSubmit} className="stripe-form">
      <div className="form-group">
        <label htmlFor="card-number">Card number</label>
        <div className="input-wrapper">
          <CardNumberElement
            id="card-number"
            options={cardStyle}
            className="stripe-input"
          />
          <CreditCard className="input-icon" />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group flex-item">
          <label htmlFor="card-expiry">Expiration date</label>
          <div className="input-wrapper">
            <CardExpiryElement
              id="card-expiry"
              options={cardStyle}
              className="stripe-input"
            />
            <Calendar className="input-icon" />
          </div>
        </div>
        <div className="form-group flex-item">
          <label htmlFor="card-cvc">CVC</label>
          <div className="input-wrapper">
            <CardCvcElement
              id="card-cvc"
              options={cardStyle}
              className="stripe-input"
            />
            <Lock className="input-icon" />
          </div>
        </div>
      </div>
      {error && <div className="error-message">{error}</div>}
      <Button
        color="red"
        type="submit"
        disabled={!stripe || isLoading}
        className="stripe-button bg-primary"
      >
        {isLoading ? "Processing..." : "Add Payment Method"}
      </Button>
    </form>
  );
};

const PaymentMethodCard = ({ isOpen, onChange }) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle"></Dialog.Title>
          <Dialog.Description className="DialogDescription">
            <Elements stripe={stripePromise}>
              <AddPaymentMethod />
            </Elements>
          </Dialog.Description>
          <Dialog.Close asChild>
            <button
              className="IconButton cursor-pointer IconButton"
              aria-label="Close"
            >
              <Cross2Icon className="w-5 h-5 IconButton" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default PaymentMethodCard;
