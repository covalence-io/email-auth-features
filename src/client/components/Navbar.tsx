import * as React from "react";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const NavButton = ({ to, text }: { to: string; text: string }) => {
    return (
        <Button sx={{ marginX: "5px", backgroundColor: "indigo" }} color="secondary" variant="contained" size="large" component={Link} to={to}>
            {text}
        </Button>
    );
};

const Navbar = () => {
    return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <NavButton to="/" text="Home" />
            <NavButton to="/login" text="Login/Register" />
        </Box>
    );
};

export default Navbar;
