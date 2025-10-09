// backend/api/v1/routes/dto/rentPropertyValidator.js

const createRentPropertyValidator = (req, res, next) => {
    const { title, description, location, price, images } = req.body;

    if (!title || typeof title !== "string" || title.trim().length < 3) {
        return res.status(400).json({
            isSuccess: false,
            field: "title",
            message: "Title is required and should be at least 3 characters.",
        });
    }

    
    if (description && typeof description !== "string") {
        return res.status(400).json({
            isSuccess: false,
            field: "description",
            message: "Description must be a string.",
        });
    }

   
    if (!location || typeof location !== "string" || location.trim().length < 2) {
        return res.status(400).json({
            isSuccess: false,
            field: "location",
            message: "Location is required and should be valid.",
        });
    }

   
    if (!price || typeof price !== "number" || price <= 0) {
        return res.status(400).json({
            isSuccess: false,
            field: "price",
            message: "Price is required and must be a positive number.",
        });
    }

    if (images && !Array.isArray(images)) {
        return res.status(400).json({
            isSuccess: false,
            field: "images",
            message: "Images must be an array of URLs.",
        });
    }

    next();
};

module.exports = { createRentPropertyValidator };
