const ContactUsFormService = require("../services/contactUs");

/**
 * Function that receives details of new member to be added from frontend and pass it to respective service
 * @param  req - The request body that contains details of the new contact form that is to be added
 * @param  res - The response object that returns the response of server back to frontend
 * @returns The response object with respective status code and JSON
 */
const addNewContactForm = async (req,res) => {
  try{ 
        const newContactForm = await ContactUsFormService.addNewContactForm(req.body);
        return res.status(201).json({
          success: true,
          message: "New form added Successfully!",
          data: newContactForm,
        });
  }catch(err){
      return res.status(500).json({
        success: false,
        message: "Error adding new member: "+err.message
      })
    }    
}

module.exports = {
    addNewContactForm
}
