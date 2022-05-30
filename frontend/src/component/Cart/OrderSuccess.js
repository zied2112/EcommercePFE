import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./OrderSuccess.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import React, { Fragment, useEffect, useRef } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { useAlert } from "react-alert";
import { createOrder, clearErrors } from "../../actions/orderAction";

const OrderSuccess = ({history}) => {
 const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
const { shippingInfo, cartItems } = useSelector((state) => state.cart);
const { user } = useSelector((state) => state.user);
const { error } = useSelector((state) => state.newOrder);
 const dispatch = useDispatch();
 const alert = useAlert();
      const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice,
      };


    useEffect(() => {
      dispatch(createOrder(order));
             
     if (error) {
     alert.error(error);
       dispatch(clearErrors());
   }
 }, [dispatch, error,alert]);

  return (
    <div className="orderSuccess">
      <CheckCircleIcon />

      <Typography>Your Order has been Placed successfully </Typography>
      <Link to="/orders">View Orders</Link>
    </div>
  );
};

export default OrderSuccess;
