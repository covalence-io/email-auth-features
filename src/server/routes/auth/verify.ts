import * as express from "express";
import Users from "../../database/queries/users";
import { TempPayload } from "../../../types";
import { verify } from "../../utilities/tokens";
import { sendRegistrationEmail } from "../../services/registrationEmail";

const router = express.Router();

router.get("/", async (req, res) => {
    const { token, email, type } = req.query;

    if (!token || !email || !type || typeof token !== "string" || typeof email !== "string" || typeof type !== "string") {
        return res.status(400).json({ message: "Missing requisite query params" });
    }

    try {
        const payload = verify(token as string) as TempPayload;
        await Users.verify(payload.email);
        res.status(200).json({ message: "Successfully verified user account!" });
    } catch (error) {
        if (type === "verify") {
            await sendRegistrationEmail(email);
        }

        res.status(500).json({ message: "Unable to validate token, please check email for new verification link" });
    }
});

export default router;
