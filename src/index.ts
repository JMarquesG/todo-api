import express from "express";
import bodyParser from "body-parser";
import taskRoutes from "./routes/TaskRoutes";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use("/api", taskRoutes);



app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found." });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/api`);
});
