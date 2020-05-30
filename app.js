const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
    return res.status(200).send({"status": "OK"})
});

app.listen(port, () =>{
    console.log('Listening on http://localhost:' + port)
})