import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route";
import expensesRouter from "./routes/expense.route"
import connectDB from "./config/db";

const app = express();
const PORT = process.env.PORT || 3000;

// Get CLIENT_URL from environment variables, fallback to localhost if not set
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

app.use(express.json());
app.use(
  cors({
    origin: [CLIENT_URL],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
connectDB()

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello from Bun + TypeScript + Express!");
});

/* route handlers */
app.use("/api/auth", authRouter);
app.use("/api/expenses", expensesRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
