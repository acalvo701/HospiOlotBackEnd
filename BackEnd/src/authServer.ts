import "dotenv/config";
import express = require("express");
const cors = require('cors');
const app = express();

const guardiaRoutes = require("./Routes/guardia.ts");
const treballadorRoutes = require("./Routes/Admin/treballador.ts");
const guardiaModelRoutes = require("./Routes/guardiamodel.ts");
const guardiaModelTreballadorRoutes = require("./Routes/guardiamodeltreballador.ts");
const guardiatreballadorRoutes = require("./Routes/guardiatreballador.ts");
const tornRoutes = require("./Routes/Admin/torn.ts");
const unitatRoutes = require("./Routes/Admin/unitat.ts");
const categoriaRoutes = require("./Routes/Admin/categoria.ts");
const historial = require("./Routes/Admin/historial.ts");
const tokenRoutes = require("./Routes/token.ts");

app.use(cors());
app.use(express.json());
app.use("/guardia", guardiaRoutes);
app.use("/treballador", treballadorRoutes);
app.use("/guardiamodel", guardiaModelRoutes);
app.use("/guardiamodeltreballador", guardiaModelTreballadorRoutes);
app.use("/guardiatreballador", guardiatreballadorRoutes);
app.use("/token",tokenRoutes);
app.use("/torn", tornRoutes);
app.use("/unitat", unitatRoutes);
app.use("/categoria", categoriaRoutes);
app.use("/historial", historial);


const port = process.env.TOKEN_SERVER_PORT;

app.listen(port, () => {
    console.log("Server listening port " + port);
});