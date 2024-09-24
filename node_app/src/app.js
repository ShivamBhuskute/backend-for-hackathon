import express from "express";
import cors from "cors";
// import cookieParser from "cookie-parser";

const app = express();

// const corsOptions = {
//     origin: "https://wisetrack.vercel.app", // Your frontend URL
//     methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
//     allowedHeaders: ["Content-Type"], // Allowed headers
//     credentials: true, // Allow credentials (cookies, authorization headers)
// };

// // Enable CORS for all routes
// app.use(cors(corsOptions));

app.use(cors({
    origin: '*', // Allow all origins temporarily for testing
    credentials: true,
}));

app.use(express.json({}));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
// app.use(cookieParser());

//routes import
import aiRouter from "./routes/aI.routes.js";
import form from "./routes/submission.routes.js";

app.use("/api/aI", aiRouter);

// for submission
app.use("/api/aI/feedback", form);

export { app };
