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
  // "pk_test_51QASgrG2eKiLhL9BNwOGXIQOoke6EAZbm28ysR5hZeBf1IF7bnfEi0BFah2DlBwgXDml4kHXQSm4ffq6CN8ZK7cZ00uqC8MaKH"
  "pk_live_51QASgrG2eKiLhL9BrtG35rD3qh640iV7sclihskPlbQx3QAPHBkHZ8Hgx9pnh4IDJyf7o7QuU9T1DwhHGcuPJ4tC00dGB55dO"
);

const AddPaymentMethod = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // const customerId = "cus_R3JjtlL7vYXFhe"; // Replace with actual customer ID
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
        console.log("i am customer mail", customerMail);
        const customerData = await getCustomerId(customerMail);
        stripeCustomerId = customerData.id;
        const response = await fetch(
          "https://api.elderlycareplatform.com/api/v1/orders/add-payment-method",
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
        fontFamily: "Arial, sans-serif",
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-4">
        <label
          htmlFor="card-number"
          className="block text-md font-medium text-gray-700 "
        >
          Card number
        </label>
        <div className="relative paymentcards ">
          <CardNumberElement
            id="card-number"
            options={cardStyle}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      <div className="flex paymentcardsEx">
        <div className="flex-1 space-y-2">
          <label
            htmlFor="card-expiry"
            className="block text-md font-medium text-gray-700"
          >
            Expiration date
          </label>
          <div className="relative">
            <CardExpiryElement
              id="card-expiry"
              options={cardStyle}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <div className="flex-1 space-y-2">
          <label
            htmlFor="card-cvc"
            className="block text-sm font-medium text-gray-700"
          >
            CVC
          </label>
          <div className="relative">
            <CardCvcElement
              id="card-cvc"
              options={cardStyle}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <Button
        color="red"
        type="submit"
        disabled={!stripe || isLoading}
        className="w-full text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 my-bg"
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
        <Dialog.Content className="DialogContent !max-w-[500px] !md:w-[360px] overflow-auto">
          <Dialog.Title className="DialogTitle"></Dialog.Title>
          <Dialog.Description className="DialogDescription p-2">
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

// "use client";
// import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';

// // Load your publishable key
// const stripePromise = loadStripe('pk_test_51Q5RdFGPITMkDJgUOb2iZNW2Y3MLWkIxYR06qC6Oww5ZyvYGJhqz8Cato4ggjhBpyC0iphT42LPT2tMGNljlzT2V00vE2KnUBP');

// const AddPaymentMethod = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const customerId = "cus_R3JjtlL7vYXFhe"; // Replace with actual customer ID

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     const cardElement = elements.getElement(CardElement);
//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: 'card',
//       card: cardElement,
//     });

//     if (error) {
//       console.error(error);
//     } else {
//       // Send payment method to backend
//       try {
//         const response = await fetch(
//           'https://www.backend.elderlycareplatform.com/api/v1/orders/add-payment-method',
//           {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//               // 'Authorization': `Bearer ${yourAccessToken}` // Add authorization token if required
//             },
//             body: JSON.stringify({
//               customerId: customerId,
//               paymentMethodId: paymentMethod.id,
//             }),
//           }
//         );

//         const result = await response.json();
//         if (response.ok) {
//           alert('Payment method added successfully!');
//         } else {
//           alert('Failed to add payment method: ' + result.message);
//         }
//       } catch (error) {
//         console.error('Error adding payment method:', error);
//       }
//     }
//   };

//   const cardStyle = {
//     style: {
//       base: {
//         color: '#32325d',
//         fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
//         fontSize: '16px',
//         '::placeholder': {
//           color: '#aab7c4',
//         },
//       },
//       invalid: {
//         color: '#fa755a',
//       },
//     },
//   };

//   return (
//     <div style={{
//       width: '700px',
//       height: '400px',
//       margin: '0 auto',
//       padding: '20px',
//       backgroundColor: '#f9f9f9',
//       borderRadius: '10px',
//       boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//       display: 'flex',
//       flexDirection: 'column',
//       justifyContent: 'center',
//       alignItems: 'center',
//     }}>
//       <form onSubmit={handleSubmit} style={{ width: '100%' }}>
//         <CardElement options={{ ...cardStyle, hidePostalCode: true }} style={{
//           padding: '10px',
//           border: '1px solid #ccc',
//           borderRadius: '4px',
//           height: '45px',
//         }} />
//         <button
//           type="submit"
//           disabled={!stripe}
//           style={{
//             marginTop: '20px',
//             padding: '10px 20px',
//             width: '100%',
//             backgroundColor: '#6772e5',
//             color: '#fff',
//             border: 'none',
//             borderRadius: '4px',
//             cursor: 'pointer',
//             fontSize: '16px',
//           }}
//         >
//           Add Payment Method
//         </button>
//       </form>
//     </div>
//   );
// };

// const App = () => (
//   <Elements stripe={stripePromise}>
//     <AddPaymentMethod />
//   </Elements>
// );

// export default App;
