import * as React from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Verify = () => {
    const loc = useLocation();
    const nav = useNavigate();

    useEffect(() => {
        async function checkEm() {
            try {
                const res = await fetch("/auth/verify" + loc.search);
                const data = await res.json();

                alert(data.message);

                if (res.ok) {
                    nav("/");
                } else {
                    console.error(data);
                }
            } catch (error) {
                console.error(error);
                alert(error.message);
            }
        }
        checkEm();
    }, []);

    return <h1>Verifying...</h1>;
};

export default Verify;
