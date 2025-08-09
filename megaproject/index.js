import express from 'express';
import dotenv from 'dotenv';
import db from './utility/db.js';
import cors from 'cors';
import allroutes from './routers/user.route.js';
import cookieparser from 'cookie-parser';

dotenv.config(); // ✅ Load .env first

const app = express();
const port = process.env.PORT || 3000; // ✅ Note: env variable names are usually uppercase

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

app.use(cors({
  origin: "http://localhost:3000" // ✅ Only origin, no path
}));

app.get('/rajbir', (req, res) => {
  res.send('Hello World!');
});

db(); // ✅ Connect to DB
app.use("/api/v1/users", allroutes); // ✅ Register routes

app.listen(port, () => {
  console.log(`✅ Server listening on port ${port}`);
});
