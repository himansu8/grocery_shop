import productModel from "../models/productModel.js";
import slugify from "slugify";
import fs from "fs"


export const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;

        //validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is Required" });
            case !description:
                return res.status(500).send({ error: "Description is Required" });
            case !price:
                return res.status(500).send({ error: "Price is Required" });
            case !category:
                return res.status(500).send({ error: "Category is Required" });
            case !quantity:
                return res.status(500).send({ error: "Quantity is Required" });
            case photo && photo.size > 1000000:
                return res
                    .status(500)
                    .send({ error: "photo is Required and should be less then 1mb" });
        }
        //console.log("------------------------", req.user.role)
        const product = new productModel({
            ...req.fields,
            slug: slugify(name),
            owner: req.user._id,
            ownerModel: req.user.role === "admin" ? "userModel" : "vendorModel",
            approved: req.user.role === "admin" ? true : false,
        })

        if (photo) {
            product.photo.data = fs.readFileSync(photo.path)
            product.photo.contentType = photo.type
        }
        await product.save()
        res.status(200).send({
            success: true,
            message: "product created successfully",
            product
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error in creating the product"
        })
    }
}


export const getAllProduct = async (req, res) => {
    try {
        const products = await productModel
            .find({
                approved: true
            }) // Only return approved products
            .populate("category")
            .select("-photo")
            .limit(12)
            .sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            totalCount: products.length,
            message: "All Products",
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in getting all products",
        });
    }
};

export const getSingleProduct = async (req, res) => {
    try {
        const product = await productModel
            .findOne({ slug: req.params.slug })
            .select("-photo")
            .populate("category");
        res.status(200).send({
            success: true,
            message: "Single Product Fetched",
            product,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: "Error in getting single product"
        })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select("-photo");
        res.status(200).send({
            success: true,
            message: "Product Deleted successfully",
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: "Error in deleting the product"
        })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;
        //alidation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is Required" });
            case !description:
                return res.status(500).send({ error: "Description is Required" });
            case !price:
                return res.status(500).send({ error: "Price is Required" });
            case !category:
                return res.status(500).send({ error: "Category is Required" });
            case !quantity:
                return res.status(500).send({ error: "Quantity is Required" });
            case photo && photo.size > 1000000:
                return res
                    .status(500)
                    .send({ error: "photo is Required and should be less then 1mb" });
        }

        const products = await productModel.findByIdAndUpdate(
            req.params.pid,
            { ...req.fields, slug: slugify(name) },
            { new: true }
        );
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: "Product Updated Successfully",
            products,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in Updte product",
        });
    }
}

export const getPhoto = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select("photo");
        if (product.photo.data) {
            res.set("Content-type", product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: "Error in getting the photo"
        })
    }
}

// filters
export const productFiltersController = async (req, res) => {
    try {
        const { checked, radio } = req.body;
        let args = {approved: true};
        if (checked.length > 0) args.category = checked;
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
        const products = await productModel.find(args);
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        console.error("Error while filtering products:", error);
        res.status(400).send({
            success: false,
            message: "Error While Filtering Products",
            error,
        });
    }
};

// search product
export const searchProductController = async (req, res) => {
    try {
        const { keyword } = req.params;
        const resutls = await productModel
            .find({
                $or: [
                    { name: { $regex: keyword, $options: "i" } },
                    { description: { $regex: keyword, $options: "i" } },
                ],
            })
            .select("-photo");
        res.json(resutls);
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error In Search Product API",
            error,
        });
    }
};


// similar products
export const realtedProductController = async (req, res) => {
    try {
        const { pid, cid } = req.params;
        const products = await productModel
            .find({
                category: cid,
                _id: { $ne: pid },
            })
            .select("-photo")
            .limit(4)
            .populate("category");
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "error while geting related product",
            error,
        });
    }
};

export const suggestProductController = async (req, res) => {
    try {
        const { keyword } = req.query; // Using req.query to get the keyword from query parameters
        const results = await productModel
            .find({
                name: { $regex: keyword, $options: "i" } // Use regex for case-insensitive matching
            })
            .limit(5) // Optional: Limit the number of suggestions returned
            .select("name"); // Only return the name field

        // Map results to an array of names
        const suggestions = results.map(result => result.name);

        res.json(suggestions); // Return the array of suggestions
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error in Search Suggestion API",
            error,
        });
    }
};



//find the all product for a perticular vendor 
export const getVendorProducts = async (req, res) => {
    try {
        const vendorId = req?.user?._id;
        const products = await productModel.find({ owner: vendorId, ownerModel: 'vendorModel' });

        if (products.length === 0) {
            return res.status(404).json({ message: "No products found for this vendor" });
        }

        res.status(200).json({ success: true, products });
    } catch (error) {
        console.error('Error getting vendor products:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

export const getPendingProducts = async (req, res) => {
    try {
        const products = await productModel.find({ approved: false })
            .populate("category");
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        console.error('Error fetching pending products:', error);
        res.status(500).send({
            success: false,
            message: 'Error fetching pending products',
            error,
        });
    }
};

export const approveProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await productModel.findByIdAndUpdate(productId, { approved: true }, { new: true });

        if (!product) {
            return res.status(404).send({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).send({
            success: true,
            message: "Product approved successfully",
            product,
        });
    } catch (error) {
        console.error('Error approving product:', error);
        res.status(500).send({
            success: false,
            message: 'Error approving product',
            error,
        });
    }
};


export const otherVendorProduct = async (req, res) => {
    try {
        const vendorId = req.user._id;  // Extract the vendor's ID from the authenticated user

        // Find products that are NOT owned by the authenticated vendor
        const products = await productModel.find({
            owner: { $ne: vendorId },  // $ne stands for "not equal"
            approved: true,  // Only fetch approved products
        })
        .populate("owner");

        res.json({ products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch products" });
    }
};

export const newlyAddedProduct = async (req,res) =>{
    try {
        const newProduct= await productModel.find().sort({createdAt: -1}).limit(8)
        res.json(newProduct)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch newly added  products" });
    }
}