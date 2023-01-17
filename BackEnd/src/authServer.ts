import "dotenv/config";
import express = require("express");
import JsonWebTokenError = require("jsonwebtoken");

const app = express();

const guardiaRoutes = require("./Routes/guardia.ts");
const userRoutes = require("./Routes/user.ts");
const tornRoutes = require("./Routes/torn.ts");
const unitatRoutes = require("./Routes/unitat.ts");
const categoriaRoutes = require("./Routes/categoria.ts");

app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/torn",tornRoutes);
app.use("/api/unitat",unitatRoutes);
app.use("/api/categoria",categoriaRoutes);
// app.use("/api/guardia",guardiaRoutes);

const port = process.env.TOKEN_SERVER_PORT;

app.listen(port, () =>{
    console.log("Server listening port"+port);
});