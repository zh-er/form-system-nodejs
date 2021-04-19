const express = require('express')
const app = express();
const router = require('./src/api.routes');
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const {initDb} = require("./src/database");


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())

app.use('/api', router);
app.use(express.static('public'));
app.get('*', function (request, response) {
    response.sendfile(path.resolve(__dirname, 'public', 'index.html'));
});

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

