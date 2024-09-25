// import express from "express";
// import cors from "cors";
// // import cookieParser from "cookie-parser";

// const app = express();

// app.use((req, res, next) => {
//     console.log(`Received ${req.method} request for ${req.url}`);
//     next();
// });

// const corsOptions = {
//     origin: "*", // Your frontend URL
//     methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
//     allowedHeaders: ["Content-Type"], // Allowed headers
//     credentials: true, // Allow credentials (cookies, authorization headers)
// };


// app.options('*', cors(corsOptions)); // Pre-flight request handling

// // Enable CORS for all routes
// app.use(cors(corsOptions));

// // app.use(cors({
// //     origin: '*', // Allow all origins temporarily for testing
// //     credentials: true,
// // }));

// app.use(express.json({}));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));
// // app.use(cookieParser());

// //routes import
// import aiRouter from "./routes/aI.routes.js";
// import form from "./routes/submission.routes.js";

// app.use("/api/aI", aiRouter);

// // for submission
// app.use("/api/aI/feedback", form);

// export { app };
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/index.js";  // Import your MongoDB connection
import aiRouter from "./routes/aI.routes.js";
import form from "./routes/submission.routes.js";

// Configure dotenv (now part of app.js)
dotenv.config({
    path: './.env'
});

const app = express();

// CORS configuration
const corsOptions = {
    origin: "*", // Your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], 
    allowedHeaders: ["Content-Type"], 
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files, if any
app.use(express.static("public"));

// Routes
app.use("/api/aI", aiRouter);
app.use("/api/aI/feedback", form);

// Test route
app.get('/api/aI/predict-student', (req, res) => {
    res.json({ message: 'Predict student endpoint is working!' });
});

// MongoDB connection
connectDB()
    .then(() => {
        console.log('MongoDB connected successfully!');
    })
    .catch((err) => {
        console.error("MongoDB connection failed: ", err);
    });

// Export the app for Vercel to handle the serverless function
export default app;
