import "dotenv/config";
import express = require("express");
import JsonWebTokenError = require("jsonwebtoken");

const app = express();

const guardiaRoutes = require("./Routes/guardia.ts");
const treballadorRoutes = require("./Routes/treballador.ts");
const guardiatreballadorRoutes = require("./Routes/guardiatreballador.ts");
const tornRoutes = require("./Routes/torn.ts");
const unitatRoutes = require("./Routes/unitat.ts");
const categoriaRoutes = require("./Routes/categoria.ts");

app.use(express.json());
app.use("/api/guardia", guardiaRoutes);
app.use("/api/treballador", treballadorRoutes);
app.use("/api/guardiatreballador", guardiatreballadorRoutes);
app.use("/api/torn", tornRoutes);
app.use("/api/unitat", unitatRoutes);
app.use("/api/categoria", categoriaRoutes);


const port = process.env.TOKEN_SERVER_PORT;

app.listen(port, () => {
    console.log("Server listening port" + port);
});