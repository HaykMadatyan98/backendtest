const express = require('express');
const json = require('./data.json');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const filepath = './data.json';

const app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors())

app.get('/', (req, res) => {
    fs.readFile(filepath, "utf-8", (err, jsonString) => {
        if (err) throw err;
        const data = JSON.parse(jsonString);
        res.send(data)
    })
})

app.post('/',  (req, res, next) => {
    const {firstname, lastname} = req.body;
    console.log(req.body)
    if (firstname && lastname) {
        const newData = {
            "firstname" : firstname,
            "lastname" : lastname
        }
        json.push(newData)
        json.forEach((elem, index) => {
            elem.id = index + 1;
        })
        fs.writeFileSync(filepath, JSON.stringify(json));
        res.send(json);
    }
})

app.listen(3300, () => {
    console.log(`Example app listening on port 3300`)
})