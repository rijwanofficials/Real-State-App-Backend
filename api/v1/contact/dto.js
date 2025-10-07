const submitContactValidator = (req, res, next) => {
    console.log("------Inside submitContactValidator--------");
    try {
        const { name, email, message } = req.body;

        // --- 1️⃣ Basic empty field validation ---
        if (!name || !email || !message) {
            return res.status(400).json({
                isSuccess: false,
                message: "All fields (name, email, message) are required.",
            });
        }

        // --- 2️⃣ Name Validation ---
        if (name.trim().length < 2) {
            return res.status(400).json({
                isSuccess: false,
                message: "Name must be at least 2 characters long.",
            });
        }

        // --- 3️⃣ Email Validation ---
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                isSuccess: false,
                message: "Please enter a valid email address.",
            });
        }

        // --- 4️⃣ Message Validation ---
        if (message.trim().length < 5) {
            return res.status(400).json({
                isSuccess: false,
                message: "Message should be at least 5 characters long.",
            });
        }

        // --- 5️⃣ Everything passed, continue ---
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
