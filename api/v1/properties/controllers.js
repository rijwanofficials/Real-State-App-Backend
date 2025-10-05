const Property = require("../../../Models/propertySchema"); // import your Property model

const createPropertyController = async (req, res) => {
  try {
    const { title, description, location, price, type, images } = req.body;
    const uid = req.user.uid; // Get UID from authenticated user

    // Create a new property instance
    const newProperty = new Property({
      uid,
      title,
      description,
      location,
      price,
      type,
      images
    });

    await newProperty.save();

    res.status(201).json({
      isSuccess: true,
      property: newProperty
    });

  } catch (err) {
    console.error("Error creating property:", err.message);
    res.status(500).json({
      isSuccess: false,
      message: "Internal server error"
    });
  }
}

module.exports = { createPropertyController };
