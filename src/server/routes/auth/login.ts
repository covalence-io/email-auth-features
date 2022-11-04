import * as express from "express";
import * as bcrypt from "bcrypt";
import Users from "../../database/queries/users";
import { sendRegistrationEmail } from "../../services/authEmails";
import { getLoginToken } from "../../utilities/tokens";

const router = express.Router();

router.post("/", async (req, res) => {
    const { email, password } = req.body;

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
            const token = getLoginToken({ id: user.id!, email, role: "user" });
            res.json({ message: "Successfully logged in", token });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Unknown error occurred while logging in." });
    }
});

export default router;
