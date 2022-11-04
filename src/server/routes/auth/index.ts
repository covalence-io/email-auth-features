import * as express from "express";
import loginRouter from "./login";
import registerRouter from "./register";
import verifyRouter from "./verify";
import magicRouter from "./magic";

const router = express.Router();

router.use("/login", loginRouter);
router.use("/register", registerRouter);
router.use("/verify", verifyRouter);
router.use("/magic", magicRouter);

export default router;
