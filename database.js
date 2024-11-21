const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
const PORT = 3000;


app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "cards",
    port: 3308, 
});


db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        process.exit(1);
    }
    console.log("Connected to the MySQL database!");
});


let fetch;
(async () => {
    fetch = (await import("node-fetch")).default;
})();


async function fetchCardImageByName(cardName) {
    try {
        const response = await fetch(`https://api.scryfall.com/cards/named?exact=${encodeURIComponent(cardName.trim())}`);
        if (!response.ok) {
            console.error(`Failed to fetch image for card name "${cardName}"`);
            return "https://via.placeholder.com/250"; 
        }
        const data = await response.json();
        return data.image_uris?.normal || data.card_faces?.[0]?.image_uris?.normal || "https://via.placeholder.com/250";
    } catch (err) {
        console.error(`Error fetching image for card name "${cardName}":`, err);
        return "https://via.placeholder.com/250"; 
    }
}


app.get("/api/cards", async (req, res) => {
    const query = "SELECT `Name`, `Price`, `ImageURL`, `Quantity` FROM cards";
    db.query(query, async (err, results) => {
        if (err) {
            console.error("Error fetching cards from database:", err);
            res.status(500).send("Database query failed");
            return;
        }

        try {

            const enhancedResults = await Promise.all(
                results.map(async (card) => {
                    if (!card.ImageURL) {

                        card.ImageURL = await fetchCardImageByName(card.Name);
                    }
                    return card;
                })
            );

            res.json(enhancedResults);
        } catch (err) {
            console.error("Error processing cards:", err);
            res.status(500).send("Failed to process card data");
        }
    });
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
