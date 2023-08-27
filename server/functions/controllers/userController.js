const {params} = require("firebase-functions/v1");
const {db} = require("../config/firebase.js");

const addUser = async (req, res) => {
  const {
    username,
    firstName,
    lastName,
    district,
    heartsReceived,
    heartsGiven,
  } = req.body;

  try {
    const userRef = db.collection("users").doc(username);
    const userObj = {
      id: username,
      firstName,
      lastName,
      district,
      heartsReceived,
      heartsGiven,
    };

    await userRef.set(userObj);

    res.status(200).send({
      status: "success",
      message: `${username} added successfully!`,
      data: userObj,
    });
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

const addUser2 = async (req, res) => {
  res.status(200).send("Hey, this function was run!");
};

// done
const getAllUsers = async (req, res) => {
  try {
    const allUsers = [];
    const userQuerySnapshot = await db.collection("users").get();

    userQuerySnapshot.forEach((doc) => {
      const userData = doc.data();
      allUsers.push(userData);
    });

    return res.status(200).json(allUsers);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
};

// done
const updateUser = async (req, res) => {
  const {
    body: {
      id,
      firstName,
      lastName,
      district,
      heartsReceived,
      heartsGiven,
    },
    params: {userId},
  } = req;

  try {
    const userRef = db.collection("users").doc(userId);
    const currentData = (await userRef.get()).data() || {};

    const newUserObj = {
      id: id || currentData.id,
      firstName: firstName || currentData.firstName,
      lastName: lastName || currentData.lastName,
      district: district || currentData.district,
      heartsReceived: heartsReceived || currentData.heartsReceived,
      heartsGiven: heartsGiven || currentData.heartsGiven,
    };

    await userRef.set(newUserObj);

    return res.status(200).json({
      status: "users",
      message: "User updated successfully", // Updated success message
      data: newUserObj,
    });
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
};

// done
const deleteUser = async (req, res) => {
  const {userId} = req.params;

  try {
    const user = db.collection("users").doc(userId);

    await user.delete().catch((e) => {
      return res.status(400).json({
        status: "error",
        message: e.message,
      });
    });

    return res.status(200).json({
      status: "success",
      message: "User deleted successfully!",
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  addUser2,
  addUser,
  getAllUsers,
  updateUser,
  deleteUser,
};
