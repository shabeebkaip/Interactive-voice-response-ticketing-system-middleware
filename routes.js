import express from "express";
import { createTicket } from "./contollers/instanceController.js";
import validateUser from "./middlewares/auth.js";

const router = express.Router();

router.get("/create-ticket", validateUser, createTicket);

export default router;
