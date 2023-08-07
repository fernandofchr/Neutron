import express  from "express";
import morgan from "morgan";
import router from "./Routes/auth.routes.js";
import cookieParser from "cookie-parser"


const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use("/api",router);

export default app;
