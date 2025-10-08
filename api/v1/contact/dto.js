const submitContactValidator = (req, res, next) => {
    console.log("------Inside submitContactValidator--------");
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({
                isSuccess: false,
                message: "All fields (name, email, message) are required.",
            });
        }

        if (name.trim().length < 2) {
            return res.status(400).json({
                isSuccess: false,
                message: "Name must be at least 2 characters long.",
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                isSuccess: false,
                message: "Please enter a valid email address.",
            });
        }

        if (message.trim().length < 5) {
            return res.status(400).json({
                isSuccess: false,
                message: "Message should be at least 5 characters long.",
            });
        }

        next();
    } catch (err) {
        console.error("------Error Inside submitContactValidator--------", err);
        res.status(500).json({
            isSuccess: false,
            message: "Validation error",
            err: err.message,
        });
    }
};

module.exports = { submitContactValidator };
