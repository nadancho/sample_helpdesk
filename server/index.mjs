import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs"
import records from "./routes/record.mjs";


const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => { 
  res.send("Hello!"); 
}); 

app.use("/ticket", records);

app.get("*", (req, res) => { 
  res.send("PAGE NOT FOUND"); 
});

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

export default app;