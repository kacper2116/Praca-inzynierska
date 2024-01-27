const router = require('express').Router()
const Cart = require("../models/Cart");


//CREATE CART

router.post("/cart", async (req, res) => {
    const newCart = new Cart(req.body);

    try {
        const savedCart = await newCart.save();
        return res.status(200).json(savedCart);
    } catch (error) {
       return res.status(500).json(error);
    }
});

//UPDATE CART

router.put("/cart:id", async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        return res.status(200).json(updatedCart);
    } catch (error) {
       return res.status(500).json(error);
    }
});

//DELETE
router.delete("/cart:id", async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
       return res.status(200).json("Cart has been deleted...");
    } catch (error) {
       return res.status(500).json(error);
    }
});

//GET USER CART
router.get("/find/:userId", async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId });
       return res.status(200).json(cart);
    } catch (error) {
       return res.status(500).json(error);
    }
});

// //GET ALL

router.get("/", async (req, res) => {
    try {
        const carts = await Cart.find();
       return res.status(200).json(carts);
    } catch (error) {
        return res.status(500).json(error);
    }
});

module.exports = router;