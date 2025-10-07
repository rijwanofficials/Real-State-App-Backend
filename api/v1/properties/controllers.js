const propertySchema = require("../../../Models/propertySchema");
const Property = require("../../../Models/propertySchema");

const createPropertyController = async (req, res) => {
  try {
    console.log("---------Inside createPropertyController------------");
    const { title, description, location, price, type, images } = req.body;
    const uid = req.user.uid;
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
    console.log(`---------Error Inside createPropertyController ------------ ${err.message}`);
    console.error("Error creating property:", err.message);
    res.status(500).json({
      isSuccess: false,
      message: "Internal server error"
    });
  }
}

const getPropertyByIdController = async (req, res) => {
  try {
    console.log("---------Inside getPropertyByIdController------------");
    const propertyId = req.params.id;
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({
        isSuccess: false,
        message: "Property not found"
      });
    }
    res.status(200).json({
      isSuccess: true,
      property
    });
  } catch (err) {
    console.log(`---------Error Inside getPropertyByIdController ------------ ${err.message}`);
    console.error("Error fetching property by ID:", err.message);
    res.status(500).json({
      isSuccess: false,
      message: "Internal server error"
    });
  }
}

const getAllPropertiesController = async (req, res) => {
  try {
    console.log("---------Inside getAllPropertiesController------------");
    const property = await propertySchema.find({});
    if (property.length == 0) {
      return res.status(404).json({
        isSuccess: false,
        message: "Property not found"
      })
    }
    else {
      return res.status(200).json({
        isSuccess: true,
        message: "All Property fetched",
        data: property
      })
    }

  }
  catch (err) {
    console.log(`---------Error Inside getAllPropertiesController ------------ ${err.message}`);
    return res.status(500).json({
      isSuccess: false,
      message: "Internal Server Error",
    })
  }
}

const deletePropertyController = async (req, res) => {
  try {
    console.log("---------Inside deletePropertyController------------");
    const propertyId = req.params.id;
    const property = await propertySchema.findById(propertyId);

    if (!property) {
      return res.status(404).json({
        isSuccess: false,
        message: "Property not found",
      });
    }
    const deletedProperty = await propertySchema.findByIdAndDelete(propertyId);
    return res.status(200).json({
      isSuccess: true,
      message: "Property deleted successfully",
      data: deletedProperty,
    });
  }
  catch (err) {
    console.log(`---------Error Inside deletePropertyController ------------ ${err.message}`);
    return res.status(500).json({
      isSuccess: false,
      message: "Internal Server Error",
    })
  }
}

const updatePropertyController = async (req, res) => {
  try {
    console.log("---------Inside updatePropertyController------------");


  }
  catch (err) {
    console.log(`---------Error Inside updatePropertyController ------------ ${err.message}`);


  }
}

module.exports = { createPropertyController, getPropertyByIdController, getAllPropertiesController, deletePropertyController, updatePropertyController };
