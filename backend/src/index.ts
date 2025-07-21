import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route";
import connectDB from "./config/db";

const app = express();
const PORT = process.env.PORT || 3000;
console.log('env var test', process.env.PORT)
app.use(express.json());
app.use(cors({ origin: "*", credentials: true }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
connectDB()

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello from Bun + TypeScript + Express!");
});

/* route handlers */
app.use("/api/auth", authRouter);
app.use("/api/expenses", authRouter);



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

