import express from "express";
import * as serviceAccountKey from "./serviceAccountKey.json";
import admin from "firebase-admin";
const serviceAccount = serviceAccountKey as admin.ServiceAccount

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://zamah-1301-default-rtdb.europe-west1.firebasedatabase.app"
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** Routes */
import authRoutes from "./routes/auth";
import cityRoutes from "./routes/cities";
import bucketRoutes from "./routes/bucket";
import fileRoutes from "./routes/files";
import realtimeRoutes from "./routes/realtime";
import jwtRouter from "./jwt/jwtrouter";
import pdfRouter from "./AXA-pdf/fillform";


app.use("/auth", authRoutes);
app.use("/city", cityRoutes);
app.use("/bucket", bucketRoutes);
app.use("/file", fileRoutes);
app.use("/realtime", realtimeRoutes);
app.use("/jwt", jwtRouter);
app.use("/fillpdf", pdfRouter);

/** Error handling */
app.use((req, res, next) => {
  const error = new Error("routing not found");
  return res.status(404).json({
    message: error.message,
  });
});

/** Server */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
