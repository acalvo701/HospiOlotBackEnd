import "dotenv/config";
import express = require("express");
import JsonWebTokenError = require("jsonwebtoken");
const cors = require('cors');
const app = express();

const guardiaRoutes = require("./Routes/guardia.ts");
const treballadorRoutes = require("./Routes/treballador.ts");
const guardiatreballadorRoutes = require("./Routes/guardiatreballador.ts");
const tornRoutes = require("./Routes/torn.ts");
const unitatRoutes = require("./Routes/unitat.ts");
const categoriaRoutes = require("./Routes/categoria.ts");
const historial = require("./Routes/historial.ts");

app.use(cors());
app.use(express.json());
app.use("/guardia", guardiaRoutes);
app.use("/treballador", treballadorRoutes);
app.use("/guardiatreballador", guardiatreballadorRoutes);
app.use("/torn", tornRoutes);
app.use("/unitat", unitatRoutes);
app.use("/categoria", categoriaRoutes);
app.use("/historial", historial);


const port = process.env.TOKEN_SERVER_PORT;

app.listen(port, () => {
    console.log("Server listening port " + port);
});