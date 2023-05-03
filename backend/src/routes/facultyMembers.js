const router = require("express").Router();
const {
  addNewMember,
  getAllMembers,
  getMemberById,
  updateMemberById,
  deleteMemberById,
} = require("../controllers/facultyMembersController");

router.post("/add", addNewMember);
router.get("/all", getAllMembers);
router.get("/:id", getMemberById);
router.put("/edit/:id", updateMemberById);
router.delete("/delete/:id", deleteMemberById);

module.exports = router;
