import { Query } from "..";
import { User } from "../../../types";

const register = (email: string, password: string) => Query("INSERT INTO Users (email, password) VALUES (?,?)", [email, password]);
const find = (email: string) => Query<User[]>("SELECT * FROM Users WHERE email=?", [email]);
const verify = (email: string) => Query("UPDATE Users SET isVerified=1 WHERE email=?", [email]);

export default {
    register,
    find,
    verify
};
