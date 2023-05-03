const router = require("express").Router();

const {
  addNewContactForm,
} = require("../controllers/contactUsFormController");

router.post("/add", addNewContactForm);

module.exports = router;