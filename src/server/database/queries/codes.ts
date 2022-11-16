import { Query } from "..";
import { Code } from "../../../types";

const create = (code: Code) => Query("INSERT INTO Codes SET ?", [code]);
const get = (email: string) => Query<Code[]>("SELECT * FROM Codes WHERE email=?", [email]);
const destroy = (email: string) => Query("DELETE FROM Codes WHERE email=?", [email]);

export default {
    create,
    get,
    destroy
};
