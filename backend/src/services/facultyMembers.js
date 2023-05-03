const FacultyMember = require("../models/FacultyMember");

/**
 * Function to add new member record to the database
 * @param  newMemberData - The details of the new member that is to be added
 * @returns The details of the new record created in database
 */
const addNewMember = async (newMemberData) => {
    try{
        const newMember = await FacultyMember.create(newMemberData);
        return newMember;
    }
    catch(err) {
        throw new Error(err.message);
    }    
}

/**
 * Function to get all the member records from the database
 * @param  
 * @returns The array of member records that are present in database
 */
const getAllMembers = async (searchTerm) => {
    try{
        const allMembers = await FacultyMember.findAll({
            where: {
                type: searchTerm
            }
        });
        return allMembers;
    }catch(err) {
        throw new Error(err.message);
    }
}

/**
 * Function to get particular member record corresponding to given id from the database
 * @param  id - The id of the member record that is to be fetched
 * @returns The details of member record corresponding to that id fetched from the database
 */
const getMemberById = async (id) => {
    try{
        const member = await FacultyMember.findByPk(id);
        if(member==null)
        {
            throw new Error(`Member not found with id: ${id}`)
        }
        return member;
    }
    catch(err)
    {
        throw new Error(err.message);
    }
}

/**
 * Function to update the member record corresponding to given id in the database
 * @param  newMemberData - The updated member details that are to be written in corresponding member record
 * @param  id - The id of the member record to be updated
 * @returns The array of number of members updated in database
 */
const updateMemberById = async(newMemberData,id) =>{
    try{
        const response = await FacultyMember.update(newMemberData, {
          where: {
            id,
          },
        });
        if(response==0)
        {
            throw new Error(`Member not found with id: ${id}`);
        }
        return response;
    }catch(err)
    {
        throw new Error(err.message);
    }
}

/**
 * Function to delete the member record of corresponding id from the database
 * @param  id - The id of the member that is to be deleted
 * @returns The array of number of  member records deleted from the database
 */
const deleteMemberById = async(id) => {
    try {
      const response = await FacultyMember.destroy({
        where: {
          id,
        },
      });
      if (response == 0) {
        throw new Error(`Member not found with id: ${id}`);
      }
      return response;
    } catch (err) {
      throw new Error(err.message);
    }
}



module.exports = {
    addNewMember,
    getAllMembers,
    getMemberById,
    updateMemberById,
    deleteMemberById
}