import React, { Fragment, useEffect, useState } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import "./ConfirmOrder.css";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { createOrder, clearErrors } from "../../actions/orderAction";
import { Typography } from "@material-ui/core";

const ConfirmOrder = ({ history }) => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

const dispatch = useDispatch();
  const alert = useAlert();
  
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
   
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    
    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    history.push("/success");
  };

useEffect(() => {
  if (error) {
    alert.error(error);
    dispatch(clearErrors());
  }
}, [dispatch, error, alert]);

  return (
    <Fragment>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Nom:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Téléphone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Addresse:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Articles de votre panier:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      {item.quantity} X {item.price} DT ={" "}
                      <b>{item.price * item.quantity} DT</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <Typography>Récapitulatif de la commande</Typography>
            <div>
              <div>
                <p>total:</p>
                <span>{subtotal} DT</span>
              </div>
              <div>
                <p>Frais d'expédition:</p>
                <span>{shippingCharges} DT</span>
              </div>
              <div>
                <p>Tax:</p>
                <span>{tax} DT</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>{totalPrice} DT </span>
            </div>

            <button onClick={proceedToPayment}>Confirmer</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
