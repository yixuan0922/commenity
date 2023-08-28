
const {params} = require("firebase-functions/v1");
const {db} = require("../config/firebase.js");

const updateHearts = async (req, res) => {
  const heartsIncrement = 10;
  const {
    body: {
      district,
      message,
      requestType,
      title,
      status,
      user,

    },
  } = req;
  const {userId} = req.query;
  try {
    const userList = [];
    const userData = await db.collection("users")
        .doc(`${userId}`)
        .get()
        .then((entry)=>entry.data());


    const postData = db.collection("posts")
        .where("title", "==", title)
        .where("district", "==", district)
        .where("user", "==", user)
        .where("message", "==", message)
        .get()
        .then((entry)=>entry.data());

    const updatedUserData = {
      id: userData.id,
      district: userData.district,
      heartsGiven: userData.heartsGiven + heartsIncrement,
      heartsReceived: userData.heartsReceived,
      firstName: userData.firstName,
      lastName: userData.lastName,
    };

    const updatedPostData = {
      district: postData.district,
      message: postData.message,
      requestType: postData.requestType,
      title: postData.title,
      user: updatedUserData,
    };


    const response = await db.collection("users")
        .doc(`${userId}`).update(updatedUserData);

    return res.status(200).json({message: `userId = ${userId}`});
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
};

// perform Yi Xuan's transaction here:
const patchHeartsTransaction = async (req, res) => {
  // const {userId} = req.query;
  // for now, I would need to mock this as
  // just YiXuan's user until I figure out the routes
  const {userId} = req.query ? req.query : "meta_pres";

  const {targetUserId} = req.body;

  try {
    const userRef = db.collection("users").doc(userId);
    const targetRef = db.collection("users").doc(targetUserId);


    const userDoc = await userRef.get()
        .catch((error)=>res.json({error: "No user found!"}));
    const targetDoc = await targetRef.get()
        .catch((error)=>res.json({error: "Target user not found!"}));

    const userData = userDoc.data();
    const targetData = targetDoc.data();

    const userCurrHeartsReceived = userData.heartsReceived;
    const userCurrHeartsGiven = userData.heartsGiven;
    const targetCurrHeartsReceived = targetData.heartsReceived;

    if (userCurrHeartsReceived < 1) {
      return res.status(400)
          .json({error: "You do not have enough hearts to give!"});
    }

    // he is my mock giver
    const userResponse = await db.collection("users")
        .doc(userId)
        .update({heartsGiven: userCurrHeartsGiven + 1,
          heartsReceived: userCurrHeartsReceived - 1});

    const targetResponse = await db.collection("users")
        .doc(targetUserId)
        .update({
          heartsReceived: targetCurrHeartsReceived + 1,
        });

    return res.status(200).json({message: "All users updated successfully!"});
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

const getHeartsInfo = async (req, res) => {
  const {targetUserId} = req.params;

  try {
    const user = await db.collection("users")
        .doc(targetUserId)
        .get();

    return res.status(200)
        .json({data: user.data(),
          message: `successfully got ${targetUserId}'s info!`});
  } catch (error) {
    return res.status(500)
        .json({error: error.message});
  }
};

const getDembouz = async (req, res) => {
  const docu = await db.collection("users").doc("dembouz").get();
  return res.status(200).json(docu.data());
};

module.exports = {
  updateHearts,
  getDembouz,
  patchHeartsTransaction,
  getHeartsInfo,
};
