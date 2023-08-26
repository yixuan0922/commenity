const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccount.json");
const functions = require("firebase-functions");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// admin.initializeApp({
//   credential: admin.credential.cert({
//     privateKey: functions.config().private.key.replace(/\\n/g, "\n"),
//     projectId: functions.config().project.id,
//     clientEmail: functions.config().client,
//   }),
// });
// found out that firestore doesn't use a URL as its identifier

const db = admin.firestore();
module.exports = {admin, db};
