const admin = require("../../config/firebaseAdmin");

const validateTokenMiddleware = async (req, res, next) => {
    console.log("-----Inside validateTokenMiddleware-----");

    const authHeader = req.headers.authorization || "";
    let token = null;

    if (authHeader.startsWith("Bearer ")) {
        token = authHeader.slice(7);
    }

    if (!token) {
        console.warn("-----No token provided-----");
        return res.status(401).json({
            isSuccess: false,
            message: "Authorization token missing",
        });
    }

    try {
        // Verify Firebase token
        const decodedToken = await admin.auth().verifyIdToken(token);
        console.log("Decoded Firebase token:", decodedToken);

        // Map token data to req.user
        req.user = {
            uid: decodedToken.uid || decodedToken.user_id,
            email: decodedToken.email,
            name: decodedToken.name || "",
            admin: decodedToken.admin || false, 
        };

        console.log("-----Firebase JWT verified and mapped to req.user-----", req.user);
        next();
    } catch (err) {
        console.error("-----Error verifying Firebase token-----", err);

        // Specific Firebase token error handling
        let message = "Authentication failed";
        if (err.code === "auth/id-token-expired") message = "Token expired";
        else if (err.code === "auth/argument-error") message = "Invalid token format";

        return res.status(401).json({
            isSuccess: false,
            message,
        });
    }
};

module.exports = { validateTokenMiddleware };
