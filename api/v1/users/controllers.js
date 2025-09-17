const User = require("../../../Models/userSchema");

// Get current logged-in user info
const getCurrentUserController = async (req, res) => {
    try {
        console.log("-----------Inside getCurrentUserController-----------");
        const uid = req.user.uid; // Extracted from validated token

        const user = await User.findOne({ uid }); // Use capitalized User

        if (!user) {
            return res.status(404).json({
                isSuccess: false,
                message: "User not found"
            });
        }

        res.json({
            isSuccess: true,
            message: "User fetched successfully",
            user,
        });
    } catch (error) {
        console.log("-----------Error Inside getCurrentUserController-----------");
        console.error("Error fetching user:", error);
        res.status(500).json({
            isSuccess: false,
            message: "Internal server error"
        });
    }
};

// Create user record in DB after Firebase signup
const createUserController = async (req, res) => {
    try {
        console.log("-----------Inside createUserController-----------");

        const uid = req.user.uid;

        // Check if user already exists
        let user = await User.findOne({ uid }); // Use User and uid instead of firebaseUid

        if (user) {
            return res.status(200).json({
                isSuccess: true,
                message: "User already exists",
                user
            });
        }

        // Extract extra fields you want from req.body, e.g. name, avatar, etc.
        const { name, email, avatar } = req.body;

        user = new User({
            uid,  // corrected from firebaseUid
            name,
            email,
            avatar,
        });

        await user.save();

        res.status(201).json({
            isSuccess: true,
            message: "User created",
            user
        });
    } catch (error) {
        console.log("----------- Error Inside createUserController-----------");
        console.error("Error creating user:", error);
        res.status(500).json({
            isSuccess: false,
            message: "Internal server error"
        });
    }
};

// Update user profile info
const updateUserController = async (req, res) => {
    try {
        console.log("-----------Inside updateUserController-----------");
        const uid = req.user.uid;
        const updates = req.body;

        // Prevent updates to immutable fields
        delete updates.uid;
        delete updates.email;

        // Update user document by uid and return updated document
        const user = await User.findOneAndUpdate(
            { uid },
            updates,
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
                isSuccess: false,
                message: "User not found"
            });
        }

        res.json({
            isSuccess: true,
            message: "User updated",
            user
        });
    } catch (error) {
        console.log("----------- Error Inside updateUserController-----------");
        console.error("Error updating user:", error);
        res.status(500).json({
            isSuccess: false,
            message: "Internal server error"
        });
    }
};

module.exports = {
    getCurrentUserController,
    createUserController,
    updateUserController,
};
