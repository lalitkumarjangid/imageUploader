import express from "express";
import { getImage, login, signup, uploadImage } from "../Controller/Admin.js";
import { errorHandler } from "../Middleware/errorHandler.js";
import upload from "../Middleware/Multer.js"; // Import the configured multer instance

const router = express.Router();

// Define routes
router.post("/signup", signup);
router.post("/login", login);
router.post('/uploadimage', upload.single('image'), uploadImage); // Apply multer middleware and uploadImage controller
router.get("/getImage", getImage);

// Error handling middleware
router.use(errorHandler);

export default router;