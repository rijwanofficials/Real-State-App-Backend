const createPropertyValidator = (req, res, next) => {
    console.log("------Inside createPropertyValidator--------");
    try {
        const { title, description, location, price, type, images } = req.body;

        if (!title || title.trim().length < 3) {
            return res.status(400).json({
                isSuccess: false,
                message: "Title validation failed (min 3 characters)",
            });
        }

        if (!description || description.trim().length < 10) {
            return res.status(400).json({
                isSuccess: false,
                message: "Description validation failed (min 10 characters)",
            });
        }

        if (!location || location.trim().length < 3) {
            return res.status(400).json({
                isSuccess: false,
                message: "Location validation failed",
            });
        }

        if (!price || Number(price) <= 0) {
            return res.status(400).json({
                isSuccess: false,
                message: "Price validation failed (must be positive number)",
            });
        }

        if (!["House", "Apartment", "Land"].includes(type)) {
            return res.status(400).json({
                isSuccess: false,
                message: "Type validation failed (must be House, Apartment, or Land)",
            });
        }

        if (!images || (typeof images !== "string" && !Array.isArray(images))) {
            return res.status(400).json({
                isSuccess: false,
                message: "Images validation failed (must be a URL or array of URLs)",
            });
        }

        next();
    } catch (err) {
        console.error("------Error Inside createPropertyValidator--------", err);
        res.status(500).json({
            isSuccess: false,
            message: "Validation error",
        });
    }
};

module.exports = { createPropertyValidator };