import * as express from "express";
import Users from "../../database/queries/users";
import { TempPayload } from "../../../types";
import { verify, getLoginToken } from "../../utilities/tokens";
import { sendMagicLinkEmail, sendRegistrationEmail } from "../../services/authEmails";

const router = express.Router();

router.get("/", async (req, res) => {
    const { token, email, type } = req.query;

    if (!token || !email || !type || typeof token !== "string" || typeof email !== "string" || typeof type !== "string") {
        return res.status(400).json({ message: "Missing requisite query params" });
    }

    try {
        const payload = verify(token as string) as TempPayload;

        if (type === "magic") {
            const [user] = await Users.find(email);
            if (!user) return res.status(401).json({ message: "Invalid credentials" });

            if (!user.isVerified) await Users.verify(payload.email);

            const loginToken = getLoginToken({ id: user.id!, email: payload.email, role: "user" });
            res.status(200).json({ message: "Successfully logged in with magic link!", token: loginToken });
        } else {
            await Users.verify(payload.email);
            res.status(200).json({ message: "Successfully verified user account!" });
        }
    } catch (error) {
        if (type === "verify") {
            await sendRegistrationEmail(email);
        } else if (type === "magic") {
            await sendMagicLinkEmail(email);
        }

        res.status(500).json({ message: "Unable to validate token, please check email for new verification link" });
    }
});

export default router;
