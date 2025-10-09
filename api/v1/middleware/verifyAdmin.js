const admin = require("../../../config/firebaseAdmin");

const verifyAdmin = async (req, res, next) => {
  try {
    console.log("-----Inside verifyAdmin-----");

    const authHeader = req.headers.authorization;
    console.log("Authorization header:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("❌ Authorization header missing or malformed");
      return res.status(401).json({
        isSuccess: false,
        message: "Authorization token missing or malformed",
      });
    }

    const token = authHeader.split("Bearer ")[1];
    console.log("Token received (first 30 chars):", token?.substring(0, 30));

    // Verify Firebase token
    console.log("🔄 Verifying token with Firebase...");
    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log("✅ Decoded Token:", decodedToken);

    // Check for admin claim
    if (!decodedToken.admin) {
      console.log("🚫 User does NOT have admin claim");
      return res.status(403).json({
        isSuccess: false,
        message: "Access denied: Admins only",
      });
    }

    console.log("✅ Admin verified successfully");
    req.user = decodedToken;
    next();
  } catch (err) {
    console.error("-----Error in verifyAdmin middleware-----", err);

    let message = "Authentication failed";

    if (err.code === "auth/id-token-expired") {
      message = "Token expired";
    } else if (err.code === "auth/argument-error") {
      message = "Invalid token format";
    }

    console.log("❌ Sending error response:", message);
    res.status(401).json({
      isSuccess: false,
      message,
    });
  }
};

module.exports = verifyAdmin;
