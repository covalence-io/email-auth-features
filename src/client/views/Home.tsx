import * as React from "react";
import { Typography, Link, Box } from "@mui/material";

const Home = () => {
    return (
        <Box sx={{ display: "flex", justifyContent: "center", textAlign: "center" }}>
            <Typography mt={20} variant="h4" component="h4">
                Be sure to
                <Link color="secondary" rel="noreferrer" target="_blank" href="https://www.youtube.com/channel/UCcKFmxtbtdruANq6kX7Hj3Q">
                    {" "}
                    like and subscribe{" "}
                </Link>
                to keep seeing our content!
            </Typography>
        </Box>
    );
};

export default Home;
