import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LanguagePage from "./LanguagePage";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LanguagePage />} />
                {/* <Route path="/region" element={<App2 />} /> */}
            </Routes>
        </BrowserRouter>
    );
};

export default App;
