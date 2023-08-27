
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

    // const postList = [];

    // if (postQuerySnapshot.empty) {
    //   return res.json({
    //     error:
    //         "No posts found!",
    //   });
    // }
    // postQuerySnapshot.forEach((el)=>postList.push(el.data()));
    // const postData = postList[0];

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
    const postRef = await db.collection("posts")
        .where("title", "==", title)
        .where("district", "==", district)
        .where("user", "==", user)
        .where("message", "==", message);

    const postList = [];
    postRef.forEach((el) => postList.push(el.data));
    const postResponse = await postList[0].update(updatedPostData);


    return res.status(200).json({message: `userId = ${userId}`});
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
};

const getDembouz = async (req, res) => {
  const docu = await db.collection("users").doc("dembouz").get();
  return res.status(200).json(docu.data());
};

module.exports = {
  updateHearts,
  getDembouz,
};
