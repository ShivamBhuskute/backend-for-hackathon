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

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});

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
