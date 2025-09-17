const admin = require("../../config/firebase"); // use your firebase.js

const validateTokenMiddleware = async (req, res, next) => {
    console.log("--------------Inside validateTokenMiddleware-------------");

    const authHeader = req.headers.authorization || "";
    let token = null;

    if (authHeader.startsWith("Bearer ")) {
        token = authHeader.slice(7);
    }

    if (!token) {
        console.log("--------------No token provided-------------");
        return res.status(401).json({
            success: false,
            message: "No token provided",
        });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        console.log("--------------Firebase JWT verified-------------");
        console.log("Decoded Firebase token:", decodedToken);
        next();
    } catch (error) {
        console.log("--------------Error in side validateTokenMiddleware-------------", error.message);
        return res.status(401).json({
            success: false,
            message: "Invalid token",
        });
    }
};

module.exports = { validateTokenMiddleware };
