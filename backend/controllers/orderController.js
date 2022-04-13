const Order = require("../models/orderModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Product = require("../models/productModel");
const req = require("express/lib/request");

// Create new Order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });
  res.status(201).json({
    success: true,
    order,
  });
});

// get Single Order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) {
    return next(new ErrorHandler("Order not found this Id", 404));
  }
  res.status(200).json({
    success: true,
    order,
  });
});

// get logged in user  Orders
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

// Get all orders --admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();
  let totalAmout = 0 
  orders.forEach(order => {
    totalAmout +=order.totalPrice
  });
  res.status(200).json({
    success: true,
    orders,
    totalAmout,
  });
});

// update order status --admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("Order not found this Id", 404));
  }
  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have already delivered this order", 400));
  }
  order.orderItems.forEach(async(o) => {
    await updateStock(o.product, o.quantity)
  });
  order.orderStatus = req.body.status
  
  if (req.body.status === "Delievered") {
    order.deliveredAt = Date.now()
  }
  await order.save({validateBeforeSave: false})
  res.status(200).json({
    success: true,
  });
  async function updateStock(id, quantity) {
    const product  = await Product.findById(id)
    product.Stock -= quantity 
    product.save({ validateBeforeSave: false });
  }
});

// delete orders --admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
if (!order) {
  return next(new ErrorHandler("Order not found this Id", 404));
}
await order.remove();
res.status(200).json({
  success: true,
});
});