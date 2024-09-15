import mongoose from "mongoose";
import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";


// Create a new order
// Create a new order
export const createOrder = async (req, res) => {
  try {
    const { products, payment, buyer, address } = req.body;

    if (!products || !payment || !buyer || !address) {
      return res.status(400).json({
        success: false,
        message: "Products, payment, and buyer information are required.",
      });
    }

    // Ensure products array contains valid productId
    products.forEach(product => {
      if (!product.productId || !product.quantity || !product.price) {
        return res.status(400).json({
          success: false,
          message: "Each product must have a valid productId, quantity, and price.",
        });
      }
    });

    // Fetch detailed product information
    const detailedProducts = await Promise.all(products.map(async (product) => {
      const productData = await productModel.findById(product.productId);
      if (!productData) {
        throw new Error(`Product with ID ${product.productId} not found`);
      }
      return {
        productId: productData._id,
        name: productData.name,
        slug: productData.slug,
        description: productData.description,
        price: product.price, // use the price from the order
        quantity: product.quantity,
        owner: productData.owner,
      };
    }));

    // Create the new order with populated product details
    const newOrder = new orderModel({
      products: detailedProducts, // Add detailed product information here
      payment, // Includes transactionId, method, amount, and status
      buyer,
      address,
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({
      success: false,
      message: "Error placing order",
      error: error.message,
    });
  }
};

// Get all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await orderModel.find()
      .populate("products")
      .populate("buyer", "name email");

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching orders",
    });
  }
};


// Get all orders of an user

export const getOrdersOfAnUser = async (req, res) => {
  try {
    const userId = req.user._id
    const orders = await orderModel.find({ buyer: userId })

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching all orders of that user",
    });
  }
}

export const singleOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    // Find the order by ID
    const order = await orderModel.findById(orderId).populate('products.productId'); // Assuming products have references to Product model

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Send order details as response
    res.json({ success: true, order });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

export const getOrdersBySeller = async (req, res) => {

  const sellerId = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(sellerId)) {
    return res.status(400).json({ success: false, message: 'Invalid seller ID' });
  }
  try {
    const orders = await orderModel.find({ 'products.owner': sellerId })
      .populate('products.productId', 'name price slug')
  

    if (orders.length === 0) {
      return res.status(200).json({ success: true, message: 'No orders found' });
    }

    res.json({ success: true, orders });
  } catch (error) {
    console.error('Error fetching orders by seller:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

export const updateOrder = async (req,res) =>{
  try {
    const { orderId } = req.params;
        const { status } = req.body;

        const updatedOrder = await orderModel.findByIdAndUpdate(
            orderId,
            { status },
            { new: true } 
        );

        if (!updatedOrder) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        return res.json({ success: true, order: updatedOrder, message: 'Order updated successfully' });
  } catch (error) {
    console.error(error);
        return res.status(500).json({ success: false, message: 'Server error' });
  }
}

