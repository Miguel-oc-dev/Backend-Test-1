import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/database";
import userRouters from "./routes/user";
import profileRoutes from "./routes/profiles";
import truckRoutes from "./routes/truck";
import orderRoutes from "./routes/order";
import locationRoutes from "./routes/location";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Conexion a la base de datos
connectDB();

// Routes
app.use("/api", profileRoutes);
app.use("/api/users", userRouters);
app.use("/api/trucks", truckRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/locations", locationRoutes);

app.get("/", (req, res) => {
    res.send("API corriendo...");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
