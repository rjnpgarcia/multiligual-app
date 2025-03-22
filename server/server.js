const express = require("express");
const path = require("path");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors("https://multilingual-app.onrender.com"));
app.use(express.json());

// Serve the React frontend
app.use(express.static(path.join(__dirname, "client", "dist")));

// Serve locale files dynamically
app.get("/locales/:lng", (req, res) => {
    const lang = req.params.lng;
    const filePath = path.join(__dirname, "locales", `${lang}.json`);

    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).json({ error: "Language file not found" });
    }
});

// // Serve the frontend for any unknown route
// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
// });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
