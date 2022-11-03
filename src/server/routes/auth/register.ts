import * as express from "express";
import * as bcrypt from "bcrypt";
import Users from "../../database/queries/users";

const router = express.Router();

router.post("/", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: "Missing info from registration" });

    try {
        const hashed = await bcrypt.hash(password, 12);
        const { insertId } = await Users.register(email, hashed);

        res.status(201).json({ message: "User was successfully registered", id: insertId });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An unknown error occurred" });
    }
});

export default router;
