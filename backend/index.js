import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import companiesRoute from "./routes/companiesRoute.js";
import usersRoute from "./routes/usersRoute.js";
import authRoute from "./routes/authRoute.js";
import kvkRoute from "./routes/kvkRoute.js";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

// Middleware to parse the request body as JSON.
app.use(express.json());

// TODO: [MERNSTACK-202] Fix backend error "PayloadTooLargeError: request entity too large" wanneer de afbeeldingdata te groot is voor ExpressJS (https://www.webslesson.info/2022/05/upload-file-in-node-js-express-using-multer.html)
// Middleware to parse the request body as JSON. Size is increased to 30mb.
app.use(bodyParser.json({ limit: "500mb" }));
// Middleware to parse the request body as URL encoded data.
app.use(bodyParser.urlencoded({ limit: "500mb", extended: true }));

// TODO: [MERNSTACK-113] Configure CORS properly before deployment.
// Example CORS configuration:
// app.use(cors({
//   origin: "http://localhost:3000",
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type"]
// }));
// How to set up credentials with CORS: https://stackoverflow.com/questions/19743396/cors-cannot-use-wildcard-in-access-control-allow-origin-when-credentials-flag-i
// Middleware to allow cross-origin requests.
app.use(cors());

// GET method available at "/".
app.get("/", (request, response) => {
  response
    .status(200)
    .send(
      "<div style='padding: 30px; width: 100vw; height: 100vh; background-color: black; position:fixed; top: 0; left: 0;'>" +
        "<h1 style='color: white;'>Welcome to my MERN stack backend server with Express.js!</h1>" +
        "</div>"
    );
});

// Use routers from /routes folder
app.use("/books", booksRoute);
app.use("/companies", companiesRoute);
app.use("/users", usersRoute);
app.use("/auth", authRoute);
app.use("/kvk", kvkRoute);

// Connect to MongoDB database
// If connection is successful, start Express.js backend server and listen to PORT
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected successfully to the database!");

    // Start Express.js server and listen to port 5555
    app.listen(PORT, () => {
      console.log(`App is listening to port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Mongoose connect error in index.js: ", error);
  });
