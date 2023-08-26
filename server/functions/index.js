/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


const express = require("express");
const functions = require("firebase-functions");

const {
  addUser,
  getAllUsers,
  updateUser,
  deleteUser} = require("./controllers/userController.js");

const app = express();
app.use(express.json());

app.get("/", (req, res) => res.status(200).json("Hey there Fadhel again!"));
app.get("/user", getAllUsers);
app.post("/user", addUser);
app.patch("/user/:userId", updateUser);
app.delete("/user/:userId", deleteUser);

// app.listen(8080, () => {console.log("server is running on 8080")} )


exports.app = functions.https.onRequest(app);


