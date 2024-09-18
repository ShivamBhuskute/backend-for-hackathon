import express from "express";
import cors from "cors";
// import cookieParser from "cookie-parser";

const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

app.use(express.json({  }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
// app.use(cookieParser());

//routes import
import aiRouter from "./routes/aI.routes.js";
import form from "./routes/submission.routes.js";

app.use("/api/aI", aiRouter)

// for submission
app.use("/api/aI/feedback", form)

export { app };
