const ContactMessage = require("../../../Models/contactSchema");
const submitContactController = async (req, res) => {
  try {
    console.log("---------Inside submitContactController------------");
    const { name, email, message } = req.body;
    const newMessage = new ContactMessage({
      name,
      email,
      message
    });
    await newMessage.save();
    res.status(201).json({
      isSuccess: true,
      message: "Contact message submitted successfully",
      data: newMessage
    });

  } catch (err) {
    console.log(`---------Error Inside submitContactController ------------ ${err.message}`);
    res.status(500).json({
      isSuccess: false,
      message: "Internal server error"
    });
  }
};

module.exports = { submitContactController };