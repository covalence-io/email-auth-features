import * as React from "react";
import { useState } from "react";
import { Typography, Grid, TextField, Switch, Button, Alert, AlertColor } from "@mui/material";
import { IAlert } from "../../types";

const LoginRegister = () => {
    const [email, setEmail] = useState("andrew@covalence.io");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const [alert, setAlert] = useState<IAlert>({ text: "", variant: "" });

    const handleLogin = async () => {
        const verb = isLogin ? "login" : "register";
        const URL = `/auth/${verb}`;

        try {
            const res = await fetch(URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (!res.ok) {
                setAlert({ text: data.message || `Could not ${verb}`, variant: "error" });
                setTimeout(handleDismissToast, 5000);

                console.error(data);
                return;
            }

            if (data.message) {
                setAlert({ text: data.message, variant: "success" });
                setTimeout(handleDismissToast, 5000);
            }

            if (data.token) {
                localStorage.setItem("token", data.token);
            }
        } catch (error) {
            console.error("Networking error:", error);
        }
    };

    const handleSendLink = async (path: string) => {
        try {
            const res = await fetch(`/auth/${path}?email=${email}`);
            const data = await res.json();

            setAlert({ text: data.message!, variant: res.ok ? "success" : "error" });

            if (!res.ok) console.error(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDismissToast = () => {
        setAlert({ text: "", variant: "" });
    };

    return (
        <Grid container borderRadius={3} sx={{ justifyContent: "center", backgroundColor: "white", marginY: "25px", padding: "15px", boxShadow: "4px 4px 4px 2px rgba(0, 0, 0, 0.2)" }}>
            <Grid item xs={12} sx={{ marginY: "10px" }}>
                <Typography sx={{ textAlign: "center" }} variant="h4" component="h4">
                    Currently {isLogin ? "logging in" : "registering"}.
                    <Switch checked={isLogin} onChange={() => setIsLogin(!isLogin)} color="secondary" />
                </Typography>
            </Grid>
            <Grid item xs={12} md={7}>
                <TextField type="email" fullWidth value={email} onChange={e => setEmail(e.target.value)} label="Email" variant="outlined" />
            </Grid>
            <Grid item xs={12} md={7}>
                <TextField type="password" fullWidth value={password} onChange={e => setPassword(e.target.value)} label="Password" variant="outlined" />
            </Grid>
            {alert?.variant && (
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", marginY: "10px" }}>
                    <Grid item xs={12} md={4}>
                        <Alert onClose={handleDismissToast} severity={alert.variant as AlertColor}>
                            {alert.text}
                        </Alert>
                    </Grid>
                </Grid>
            )}
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", marginY: "10px" }}>
                <Button sx={{ marginX: "4px" }} onClick={handleLogin} size="large" variant="contained" color="secondary">
                    {isLogin ? "Login" : "Register"}
                </Button>

                {isLogin && email && !password && (
                    <Button sx={{ marginX: "4px" }} onClick={() => handleSendLink("magic/generate")} size="large" variant="contained" color="primary">
                        Send magic link
                    </Button>
                )}

                {isLogin && email && !password && (
                    <Button sx={{ marginX: "4px" }} onClick={() => handleSendLink("reset")} size="large" variant="contained" color="primary">
                        Send password reset link
                    </Button>
                )}
            </Grid>
        </Grid>
    );
};

export default LoginRegister;
