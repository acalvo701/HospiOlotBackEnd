import "dotenv/config";
import express = require("express");
import JsonWebTokenError = require("jsonwebtoken");

const app = express();

const userRoutes = require("./Routes/user.ts");
const guardiaRoutes = require("./Routes/guardia.ts");

app.use(express.json());
app.use("/api/user", userRoutes);
// app.use("/api/guardia",guardiaRoutes);

const port = process.env.TOKEN_SERVER_PORT;

app.listen(port, () =>{
    console.log("Server listening port"+port);
});