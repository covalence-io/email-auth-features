import { Container } from "@mui/material";
import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Navbar from "./components/Navbar";
import LoginRegister from "./views/Login";
import Verify from "./views/Verify";

const App = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Container>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginRegister />} />
                    <Route path="/verify" element={<Verify />} />
                </Routes>
            </Container>
        </BrowserRouter>
    );
};

export default App;
