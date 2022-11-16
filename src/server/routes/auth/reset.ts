import * as express from "express";
import * as bcrypt from "bcrypt";
import Users from "../../database/queries/users";
import { sendResetLink } from "../../services/authEmails";
import { verify, getLoginToken } from "../../utilities/tokens";
import { TempPayload } from "../../../types";

const router = express.Router();

router.get("/", async (req, res) => {
    const { email } = req.query as { email: string };

    if (!email) return res.status(400).json({ message: "Missing email query param" });

    try {
        await sendResetLink(email);
        res.status(200).json({ message: "Password reset sent, please check your inbox" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Password reset link could not be sent at this time, please try again later." });
    }
});

router.post("/", async (req, res) => {
    const { password } = req.body as { password: string };
    const { email, token } = req.query as { email: string; token: string };

    if (!email || !token || !password) return res.status(400).json({ message: "Missing email, token, or password from req body" });

    try {
        const [user] = await Users.find(email);
        if (!user) return res.status(401).json({ message: "Invalid credentials" });

        const { email: verifiedEmail } = verify(token) as TempPayload;
        const hashed = await bcrypt.hash(password, 12);
        await Users.resetPassword(hashed, verifiedEmail);
        const loginToken = getLoginToken({ email, id: user.id!, role: "user" });
        res.json({ message: "Successfully reset password!", token: loginToken });
    } catch (error) {
        console.log(error);

        try {
            await sendResetLink(email);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Password reset link could not be verified, and the new reset link could not be sent at this time, please try again later." });
        }

        res.status(500).json({ message: "Password reset link could not be validated." });
    }
});

export default router;
