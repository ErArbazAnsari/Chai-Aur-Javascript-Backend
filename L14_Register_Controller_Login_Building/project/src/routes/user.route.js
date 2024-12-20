import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "photo",
      maxCount: 1,
    },
    {
      name: "bgImg",
      maxCount: 1,
    },
  ]),
  registerUser,
);

export default router;
