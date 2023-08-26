const express = require("express");
const cors = require("cors");
const app = express();
const port = 5001;

app.get("/", (req, res) => {
    return res.send("Hello world!");
});

app.listen(port, () => {console.log("server is runnung on ", port)} )