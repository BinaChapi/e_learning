// server.js (ESM version)
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";

import userRoutes from "./routes/UserRoutes.js";
import chapterRoutes from "./routes/chapterRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import pdfRoutes from "./routes/pdfRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(helmet());

mongoose
  .connect("mongodb://localhost:27017/Final_YearProjects", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

app.use("/api", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/chapters", chapterRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/pdfs", pdfRoutes);
app.use("/api/enrollments", enrollmentRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
