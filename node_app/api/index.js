import { app } from "../src/app.js";
import dotenv from "dotenv";
import connectDB from "../src/db/index.js";

dotenv.config({
    path: './.env'
})


// PORT = 3000;

app.use('/', (req, res) => {
    res.send("Atleast working😭")
  });

connectDB()
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})

