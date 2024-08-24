import JWT from "jsonwebtoken"
import userModel from "../models/userModel.js"
import config from "../config/config.js"
import vendorModel from "../models/vendorModel.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const decode = JWT.verify(req.headers.authorization, config.PRIVATE_KEY);
    let user = await userModel.findById(decode._id)
    let vendor = null;

      // If not found in userModel, check in vendorModel
      if (!user) {
        vendor = await vendorModel.findById(decode._id);
      }
    if(user){
      req.user = user._id;
      req.user.role = user.role;
    }
    else if (vendor) {
      req.user = vendor._id;
      req.user.role = vendor.role;
    }
    //console.log(user)
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next()
  } catch (error) {
    console.log(error)
  }
}


//admin access

export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== "admin") {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized admin Access",
      })
    } else {
      next();
    }
  } catch (error) {
    console.error("Admin Access Error: ", error);
    return res.status(500).json({ message: "Admin Access Only " });
  }
}


// Vendor Access Middleware
export const isVendor = async (req, res, next) => {
  try {
    const user = await vendorModel.findById(req.user._id);
    if (user.role !== "vendor") {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Access - Vendors Only",
      });
    } else {
      next();
    }
  } catch (error) {
    console.error("Vendor Access Error: ", error);
    return res.status(500).json({ message: "Vendors Error Only" });
  }
};

// Admin or Vendor Access Middleware
export const isAdminOrVendor = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    const vendor = await vendorModel.findById(req.user._id);

    if (user && user.role === "admin") { 
      return next();
    }

    if (vendor && vendor.role === "vendor") { 
      return next(); 
    } else {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Access - Admins or Vendors Only",
      });
    }
  } catch (error) {
    console.error("Access Control Error: ", error);
    return res.status(500).json({ message: "Server Error - Admins or Vendors Only" });
  }
};