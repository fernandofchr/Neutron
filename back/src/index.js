import app from "./app.js";
import { connectDB } from "./db.js";

connectDB();
app.listen(4500)
console.log("server port: ", 4500);