const express = require('express')
const app = express()

app.listen(3000, () => {
    console.log('Succefully Connected localhost: 3000')
});

app.get('/', (req, res) => {
    res.send("<h2> Demo Page </h2>")
})