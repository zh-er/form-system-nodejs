const express = require('express')
const app = express();
const router = require('./src/api.routes');
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");
const {initDb} = require("./src/database");


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())

app.use(express.static('public'));
app.use('/api', router);

const server = http.createServer(app);


initDb()
    .then(r => {
        server.listen(8080, () => {
            console.log(`Starting server at port ${8080} ...`)
        })
    })
    .catch((error) => {
        console.error('Failed to start server')
        console.error(error)
    })

