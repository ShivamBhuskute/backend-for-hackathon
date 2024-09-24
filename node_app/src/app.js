import express from "express";
import cors from "cors";
// import cookieParser from "cookie-parser";

const app = express();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://wisetrack.vercel.app");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
  });

const corsOptions = {
    origin: "*", // Your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    allowedHeaders: ["Content-Type"], // Allowed headers
    credentials: true, // Allow credentials (cookies, authorization headers)
};

app.use((req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url}`);
    next();
});

app.options('*', cors(corsOptions)); // Pre-flight request handling

// Enable CORS for all routes
app.use(cors(corsOptions));

// app.use(cors({
//     origin: '*', // Allow all origins temporarily for testing
//     credentials: true,
// }));

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
