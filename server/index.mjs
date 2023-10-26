import express from "express";
import cors from "cors";
import "../loadEnvironment.mjs";
import records from "../routes/record.mjs";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors(
  {
    origin: ["https://deploy-mern-1whq.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true,
  }

));
app.use(express.json());

app.use("/ticket", records);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

export default app;