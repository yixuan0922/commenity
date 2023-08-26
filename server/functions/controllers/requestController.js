const {params} = require("firebase-functions/v1");
const {db} = require("../config/firebase.js");
const logger = require("firebase-functions/logger");
db.settings({ignoreUndefinedProperties: true});

const addPost = async (req, res) => {
  const {userName, title, message, requestType, district} = req.body;
  try {
    const querySnapshot = await db.collection("posts")
        .where("title", "==", title)
        .where("userName", "==", userName)
        .where("requestType", "==", requestType)
        .where("message", "==", message)
        .where("district", "==", district)
        .get();
    // No matching post found, create a new post
    if (querySnapshot.empty) {
      const userDoc = await db.collection("users")
          .doc(userName).get();

      const newPostObj = {
        title: title,
        message: message,
        requestType: requestType,
        district: district,
        user: userDoc.data(),
      };
      logger.info(`newPostObj = ${newPostObj}`, {structuredData: true});

      await db.collection("posts").add(newPostObj);
      logger.info("added new post!", {structuredData: true});

      res.status(200).send({
        status: "success",
        message: `${userName}'s post titled ${title} was added successfully!`,
        data: newPostObj,
      });
    } else {
      console.log("A help post with the same title and user already exists");
      return res.status(400).json({error: "The user already exists!"});
    }
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
};

const getPosts = async (req, res) => {
  const {district} = req.query;

  try {
    const allPosts = [];
    const postQuerySnapshot = await db.collection("posts")
        .where("district", "==", district)
        .get();

    // Check if there are no documents in the snapshot
    if (postQuerySnapshot.empty) {
      return res.status(404).json({message: "No posts found"});
    }

    // Iterate through the documents and extract user data
    postQuerySnapshot.forEach((doc) => {
      const postData = doc.data();
      allPosts.push(postData);
    });

    return res.status(200).json(allPosts);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
};


module.exports = {
  getPosts,
  addPost,
};


