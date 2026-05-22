import express from "express";
import cors from "cors";
import eventRoutes from "./routes/eventRoute.js";
import categoryRoutes from "./routes/categoryRoute.js";
import pembicaraRoutes from "./routes/pembicaraRoute.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("BE is running");
});

app.use("/events", eventRoutes);
app.use("/categories", categoryRoutes);
app.use("/pembicara", pembicaraRoutes);

//jalankan server
const PORT = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});