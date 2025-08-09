import express from 'express';

const app = express();

app.use(express.json());

import {registeruser} from "../controller/control.js"

const router = express.Router();
router.post("/register",registeruser)


 export default router;