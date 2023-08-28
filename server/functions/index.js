const express = require("express");
const functions = require("firebase-functions");

const {
  addUser,
  getAllUsers,
  updateUser,
  deleteUser} = require("./controllers/userController.js");

const {
  getPosts,
  addPost,
} = require("./controllers/requestController.js");

const {
  updateHearts,
  getDembouz,
  patchHeartsTransaction,
} = require("./controllers/heartsController.js");

const app = express();
app.use(express.json());

// app.get("/", (req, res) => res.status(200).json("Hey there Fadhel again!"));
app.get("/user", getAllUsers);
app.post("/ ", addUser);
app.patch("/user/:userId", updateUser);
app.delete("/user/:userId", deleteUser);
app.post("/create", addPost);
app.get("/", getPosts);

app.patch("/post", updateHearts);
app.get("/post", getDembouz);

app.patch("/giveHearts:userId?", patchHeartsTransaction);


// app.listen(8080, () => {console.log("server is running on 8080")} )


exports.app = functions.https.onRequest(app);


