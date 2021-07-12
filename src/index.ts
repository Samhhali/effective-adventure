import express, { Express, Application } from "express";
import http from "http";
import routes from "./routes/auth";
import * as serviceAccountKey from "../serviceAccountKey.json";
import * as admin from "firebase-admin";
const serviceAccount = serviceAccountKey as admin.ServiceAccount

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://zamah-1301-default-rtdb.europe-west1.firebasedatabase.app"
});

const app: Application = express();
app.use(express.urlencoded());
app.use(express.json());
const router: Express = express();

/** Routes */
router.use("/", routes);

/** Error handling */
router.use((req, res, next) => {
  const error = new Error("not found");
  return res.status(404).json({
    message: error.message,
  });
});

/** Server */
const httpServer = http.createServer(router);
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
