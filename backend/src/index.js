import { Hono } from "hono";
import { cors } from "hono/cors";
import { userRouter } from "./routes/userRoutes";
import { blogRouter } from "./routes/blogRoutes";
const app = new Hono();
app.use("*", cors({
    origin: "http://localhost:5173",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
}));
app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);
export default app;
