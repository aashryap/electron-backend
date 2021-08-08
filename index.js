const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const configs = require("./configs");
const {videoToken} = require('./token');
const app = express();
const PORT = 4000;

app.use(cors("*"));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Video server");
})

app.post('/video/token', (req, res) => {
    try {
        console.log("REQUEST ", req.body);
        const identity = req.body.identity;
        const room = req.body.room;
        const token = videoToken(identity, room, configs);
        console.log("TOKEN ", token);
        res.status(200).send({token: token.toJwt()});
    } catch(err) {
        res.status(500).send("Internal server error");
    }
})

app.listen(process.env.PORT || PORT, () => {
    console.log("Server started on port ", PORT);
});