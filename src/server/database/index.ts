import { createPool, OkPacket } from "mysql";
import config from "../config";

const pool = createPool(config.mysql);

export const Query = <T = OkPacket>(sql: string, values: unknown[] = []) => {
    return new Promise<T>((resolve, reject) => {
        pool.query(sql, values, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};
