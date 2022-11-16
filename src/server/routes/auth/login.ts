import * as express from "express";
import * as bcrypt from "bcrypt";
import Users from "../../database/queries/users";
import Codes from "../../database/queries/codes";
import { sendMFALink, sendRegistrationEmail } from "../../services/authEmails";
import { getLoginToken } from "../../utilities/tokens";
import { generateCode, validate } from "../../utilities/code";

const router = express.Router();

router.post("/", async (req, res) => {
    const { email, password, code } = req.body;

    if (!email || !password) return res.status(400).json({ message: "Missing info from login" });

    try {
        const [user] = await Users.find(email);
        if (!user) return res.status(401).json({ message: "Invalid credentials." });

        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (!passwordsMatch) return res.status(401).json({ message: "Invalid credentials." });

        if (!user.isVerified) {
            await sendRegistrationEmail(email);
            res.status(403).json({ message: "Please check your email and verify your account" });
        } else {
            if (!user.mfaIsEnabled) {
                const token = getLoginToken({ id: user.id!, email, role: "user" });
                res.json({ message: "Successfully logged in", token });
            } else {
                if (code) {
                    const matches = await validate(parseInt(code), email);

                    if (matches) {
                        const token = getLoginToken({ id: user.id!, email, role: "user" });
                        res.json({ message: "Successfully logged in", token });
                    } else {
                        const newCode = await generateCode(user.email);
                        await sendMFALink(newCode);
                        await Codes.destroy(user.email);
                        await Codes.create(newCode);
                        res.status(401).json({ message: "Incorrect code, please check your email for the 6 digit code", needsMFA: true });
                    }
                } else {
                    const newCode = await generateCode(user.email);
                    await sendMFALink(newCode);
                    await Codes.destroy(user.email);
                    await Codes.create(newCode);
                    res.json({ message: "Please check your email for the 6 digit code", needsMFA: true });
                }
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Unknown error occurred while logging in." });
    }
});

export default router;
