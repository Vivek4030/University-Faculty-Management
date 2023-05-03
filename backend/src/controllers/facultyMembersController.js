const FacultyMembersService =  require("../services/facultyMembers");


/**
 * Function that receives details of new member to be added from frontend and pass it to respective service
 * @param  req - The request body that contains details of the new member that is to be added
 * @param  res - The response object that returns the response of server back to frontend
 * @returns The response object with respective status code and JSON
 */
const addNewMember = async (req,res) => {
  try{
      let newPublications = req.body.publications+'&'
      if(req.body.publications === null) {
          newPublications = '&';
      }
      let newHonors = req.body.honors + "&";
      if (req.body.honors === null) {
        newHonors = "&";
      }
      let newProjects = req.body.projects + "&";
      if (req.body.projects === null) {
        newProjects = "&";
      }
      let newAchievements = req.body.achievements + "&";
      if (req.body.achievements === null) {
        newAchievements = "&";
      }
        const modifiedMemberData = {
          ...req.body,
          education: req.body.education + "&",
          interests: req.body.interests + "&",
          honors: newHonors,
          publications: newPublications,
          projects: newProjects,
          achievements: newAchievements,
        };  
        const newMember = await FacultyMembersService.addNewMember(modifiedMemberData);
        return res.status(201).json({
          success: true,
          message: "Member added Successfully!",
          data: newMember,
        });
  }catch(err){
      return res.status(500).json({
        success: false,
        message: "Error adding new member: "+err.message
      })
    }    
}


/**
 * Function that fetches all the member records through service and pass it to frontend
 * @param  req - The request body
 * @param  res - The response object that returns the response of server back to frontend
 * @returns The response object with respective status code and JSON
 */
const getAllMembers = async (req,res) => {
  try{
    const type = req.query.type;
    const allMembers = await FacultyMembersService.getAllMembers(type);
    return res.status(201).json({
      success: true,
      message: "All members retrieved successfully",
      data: allMembers,
    });
  }catch(err)
  {
    return res.status(500).json({
      success: false,
      message: "Error retrieving members: " + err.message,
    });
  }
}

/**
 * Function that fetches the details of particular member through service and pass it to frontend
 * @param  req - The request param contains the id of the member to be fetched
 * @param  res - The response object that returns the response of server back to frontend
 * @returns The response object with respective status code and JSON
 */
const getMemberById = async (req,res) => {
  try{
    const foundMember = await FacultyMembersService.getMemberById(req.params.id);
    return res.status(201).json({
      success: true,
      message: "Found the member of given id",
      data: foundMember,
    });
  }catch(err)
  {
    return res.status(500).json({
      success: false,
      message: "Error finding the member: " + err.message,
    });
  }
}


/**
 * Function that updates the details of particular member through service
 * @param  req - The request param contains the id of the member to be updated
 *                and request body contains the new details of the member 
 * @param  res - The response object that returns the response of server back to frontend
 * @returns The response object with respective status code and JSON
 */
const updateMemberById = async (req,res) => {
  try{
    let newPublications = req.body.publications + "&";
    if (req.body.publications === null) {
      newPublications = "&";
    }
    let newHonors = req.body.honors + "&";
    if (req.body.honors === null) {
      newHonors = "&";
    }
    let newProjects = req.body.projects + "&";
    if (req.body.projects === null) {
      newProjects = "&";
    }
    let newAchievements = req.body.achievements + "&";
    if (req.body.achievements === null) {
      newAchievements = "&";
    }
    const modifiedMemberData = {
      ...req.body,
      education: req.body.education + "&",
      interests: req.body.interests + "&",
      honors: newHonors,
      publications: newPublications,
      projects: newProjects,
      achievements: newAchievements,
    };
    
    const updatedMemberId = await FacultyMembersService.updateMemberById(modifiedMemberData,req.params.id);
    return res.status(201).json({
      success: true,
      message: "Updated the member successfully",
      data: updatedMemberId
    });
  }catch(err)
  {
    return res.status(500).json({
      success: false,
      message: "Error updating the member: " + err.message,
    });
  }
}


/**
 * Function that deletes the details of particular member through service
 * @param  req - The request param contains the id of the member to be deleted
 * @param  res - The response object that returns the response of server back to frontend
 * @returns The response object with respective status code and JSON
 */
const deleteMemberById = async (req,res) => {
  try {
    await FacultyMembersService.deleteMemberById(req.params.id);
    return res.status(201).json({
      success: true,
      message: "Deleted the member successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error deleting the member: " + err.message,
    });
  }
}

module.exports = {
    addNewMember,
    getAllMembers,
    getMemberById,
    updateMemberById,
    deleteMemberById
}