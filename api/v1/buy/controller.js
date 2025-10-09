const BuyProperty = require("../../../Models/buyPropertySchema");

const createBuyPropertyController = async (req, res) => {
    try {
        console.log("-----Inside createBuyPropertyController-----");
        const { title, description, location, price, images } = req.body;
        const newProperty = await BuyProperty.create({
            title,
            description,
            location,
            price,
            images,
        });
        if (!newProperty) {
            res.status(400).json({
                isSuccess: true,
                message: "Buy property creation failed",
            });
            return;
        }

        res.status(201).json({
            isSuccess: true,
            data: newProperty,
            message: "Buy property created successfully",
        });
    } catch (err) {
        console.log("-----Error Inside createBuyPropertyController-----", err.message);
        res.status(500).json({
            isSuccess: false,
            message: "Internal Server Error"
        });
    }
}

const getBuyPropertyController = async (req, res) => {
    try {
        console.log("-----Inside getBuyPropertyController-----");
        let properties;
        if (req.user && req.user.admin) {
            // Admin sees all properties
            properties = await BuyProperty.find().select("title price status images");
        } else {
            // Normal users see only available properties
            properties = await BuyProperty.find({ status: "available" }).select("title price status images");
        }
        res.status(200).json({
            isSuccess: true,
            data: properties,
            message: "Buy properties fetched successfully",
        });
    } catch (err) {
        console.log("-----Error Inside getBuyPropertyController-----");
        res.status(500).json({
            isSuccess: false,
            message: "Failed to fetch buy properties: " + err.message,
        });
    }
}


module.exports = { createBuyPropertyController, getBuyPropertyController }