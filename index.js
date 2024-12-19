import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes.js";

dotenv.config({ path: ".env" });

const app = express();

app.use(cors());
app.use(express.json());
app.use("/ivr", router);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
