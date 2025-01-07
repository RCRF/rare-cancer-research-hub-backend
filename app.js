import express from "express";
import cors from "cors";
import organizationRoutes from "./routes/organizationRoutes.js";
import institutionRoutes from "./routes/institutionRoutes.js";
import providerRoutes from "./routes/providerRoutes.js";
import openAIRoutes from "./routes/openAIRoutes.js";
import authenticationRoutes from "./routes/authenticationRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import articleRoutes from "./routes/articleRoutes.js";
import tagRoutes from "./routes/tagRouter.js";
import uploadRoutes from "./routes/uploadRouter.js";
import { clerkMiddleware } from '@clerk/express'


const app = express();
const port = process.env.PORT || 5194;

app.use(express.json());
app.use(cors());
app.use(clerkMiddleware())
app.use("/api/organizations", organizationRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/openai", openAIRoutes);
app.use("/api/login", authenticationRoutes);
app.use("/api/institutions", institutionRoutes);
app.use("/api/providers", providerRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tags", tagRoutes);
app.use("/api/upload", uploadRoutes);

const environment = process.env.NODE_ENV;

if (environment === "production") {
  app.use((req, res, next) => {
    if (req.header("x-forwarded-proto") !== "https") {
      res.redirect(`https://${req.header("host")}${req.url}`);
    } else {
      next();
    }
  });
}

export default app;
