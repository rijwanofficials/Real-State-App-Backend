const admin = require("firebase-admin");
const path = require("path");

const serviceAccount = require(path.resolve(__dirname, "./serviceAccountKey.json"));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: serviceAccount.project_id, // make sure projectId is passed
  });
  console.log("<<------✅ Firebase Admin initialized with project------->>");
}

module.exports = admin;
