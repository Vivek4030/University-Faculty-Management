const ContactUsForm = require("../models/ContactUsForm");

/**
 * Function to add new member record to the database
 * @param  newContactFormData - The details of the new member that is to be added
 * @returns The details of the new record created in database
 */
const addNewContactForm = async (newContactFormData) => {
  try {
    const newContactForm = await ContactUsForm.create(newContactFormData);
    return newContactForm;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
    addNewContactForm
}