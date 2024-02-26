require("dotenv").config();
const express = require("express");

const PORT = process.env.PORT || 1203;
const app = express();
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Bot Is Working")
});


try {
    app.listen(PORT, () => {
        console.log(`Server Connected on Port: ${PORT}`);
    });
} catch (error) {
    console.log(`Can't connected to the server: ${error.message}`);
}