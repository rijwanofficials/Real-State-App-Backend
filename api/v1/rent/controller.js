const RentProperty = require("../../../Models/rentPropertySchema");

const createRentPropertyController = async (req, res) => {
    try {
        console.log("-----Inside createRentPropertyController-----");
        const { title, description, location, price, images } = req.body;
        const newProperty = await RentProperty.create({
            title,
            description,
            location,
            price,
            images,
        });
        if (!newProperty) {
            res.status(400).json({
                isSuccess: false,
                message: "Rent Property creation failed",
            })
            return;
        }
        res.status(201).json({
            isSuccess: true,
            data: newProperty,
            message: "Rent property created successfully",
        });
    }
    catch (err) {
        console.log("----- Error Inside createRentPropertyController-----", err.message);
        res.status(500).json(
            {
                isSuccess: false,
                message: "Internal Server Error"
            });
    }

}


const getRentPropertyController = async (req, res) => {
    try {
        console.log("-----Inside getRentPropertyController-----");
        let properties;
        if (req.user && req.user.admin) {
            // Admin sees all properties
            properties = await RentProperty.find().select("title price status images");
        } else {
            // Normal users see only available properties
            properties = await RentProperty.find({ status: "available" }).select("title price status images");
        }

        res.status(200).json({
            isSuccess: true,
            data: properties,
            message: "Rent properties fetched successfully",
        });
    } catch (err) {
        console.log("----- Error Inside getRentPropertyController-----", err.message);
        res.status(500).json({
            isSuccess: false,
            message: "Internal Server Error"
        });
    }
}
module.exports = { getRentPropertyController, createRentPropertyController };