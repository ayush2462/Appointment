import contactModel from "../models/contactModel.js";

// API to submit patient contact form
const submitContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.json({
        success: false,
        message: "Name, email, and message are required fields",
      });
    }

    const newContact = new contactModel({
      name: name.trim(),
      email: email.trim(),
      phone: phone ? phone.trim() : "",
      subject: subject || "General Inquiry",
      message: message.trim(),
      date: Date.now(),
    });

    await newContact.save();

    res.json({
      success: true,
      message: "Your message has been submitted successfully!",
      contact: newContact,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get all contact inquiries for admin
const getAllContacts = async (req, res) => {
  try {
    const contacts = await contactModel.find({}).sort({ date: -1 });
    res.json({ success: true, contacts });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to update contact inquiry status (Pending, Responded, Archived)
const updateContactStatus = async (req, res) => {
  try {
    const { contactId, status } = req.body;

    if (!contactId || !status) {
      return res.json({ success: false, message: "Missing contactId or status" });
    }

    const updatedContact = await contactModel.findByIdAndUpdate(
      contactId,
      { status },
      { new: true }
    );

    res.json({
      success: true,
      message: `Inquiry status updated to ${status}`,
      contact: updatedContact,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to delete a contact inquiry
const deleteContact = async (req, res) => {
  try {
    const { contactId } = req.body;

    if (!contactId) {
      return res.json({ success: false, message: "Missing contactId" });
    }

    await contactModel.findByIdAndDelete(contactId);
    res.json({ success: true, message: "Inquiry deleted successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { submitContact, getAllContacts, updateContactStatus, deleteContact };
