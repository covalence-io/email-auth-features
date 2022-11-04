import * as express from "express";
import { sendMagicLinkEmail } from "../../services/authEmails";

const router = express.Router();

router.get("/generate", async (req, res) => {
    const { email } = req.query;

    if (!email || typeof email !== "string") return res.status(400).json({ message: "Must have proper email params" });

    try {
        await sendMagicLinkEmail(email);
        res.status(200).json({ message: "Check your email for your magic link!" });
    } catch (error) {
        res.status(500).json({ message: "Could not send magic link, please try again later" });
    }
});

export default router;
