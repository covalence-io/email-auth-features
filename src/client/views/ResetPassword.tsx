import * as React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, Typography, TextField, Alert, Button } from "@mui/material";
import { IAlert } from "../../types";

const ResetPassword = () => {
    const [alert, setAlert] = useState<IAlert>({ text: "", variant: "" });
    const [password, setPassword] = useState("");

    const loc = useLocation();
    const nav = useNavigate();

    const handleDismissToast = () => {
        setAlert({ text: "", variant: "" });
    };

    const handleReset = async () => {
        try {
            const res = await fetch(`/auth/reset${loc.search}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password })
            });
            const data = await res.json();
            setAlert({ text: data.message!, variant: res.ok ? "success" : "error" });

            if (data.token) {
                localStorage.setItem("token", data.token);

                setTimeout(() => {
                    nav("/");
                }, 5000);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Grid container borderRadius={3} sx={{ justifyContent: "center", backgroundColor: "white", marginY: "25px", padding: "15px", boxShadow: "4px 4px 4px 2px rgba(0, 0, 0, 0.2)" }}>
            <Grid item xs={12} sx={{ marginY: "10px" }}>
                <Typography sx={{ textAlign: "center" }} variant="h4" component="h4">
                    Currently resetting password
                </Typography>
            </Grid>
            <Grid item xs={12} md={7}>
                <TextField type="password" fullWidth value={password} onChange={e => setPassword(e.target.value)} label="Password" variant="outlined" />
            </Grid>
            {alert?.variant && (
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", marginY: "10px" }}>
                    <Grid item xs={12} md={4}>
                        <Alert onClose={handleDismissToast} severity={alert.variant}>
                            {alert.text}
                        </Alert>
                    </Grid>
                </Grid>
            )}
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", marginY: "10px" }}>
                <Button sx={{ marginX: "4px" }} onClick={handleReset} size="large" variant="contained" color="secondary">
                    Reset!
                </Button>
            </Grid>
        </Grid>
    );
};

export default ResetPassword;
