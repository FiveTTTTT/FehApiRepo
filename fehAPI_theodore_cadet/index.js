const express = require('express')
const app = express()
const port = 3000
const { FehHeroes } = require('./feh.js')
const ike = new FehHeroes("Ike", "the Dawn legend", 1 / 2, { hp: 40, atk: 51, spd: 42, def: 32, res: 23, }, true, false);
// console.log(ike);

app.get('/', (req, res) => {
    res.send('Théodore CADET');
})
// app.get('/message', (req, res) => {
//     res.send("it's-a me Mario");
// })
// app.get('/othermessage', (req, res) => {
//     res.send("it's-a me Luigi");
// })
app.get('/showheroes', (req, res) => {
    console.log("this hero has been summoned");
    res.send(ike);
})
app.post('/showheroes', (req, res) => {
    res.send("yay ya post it");
    console.log(req.body);
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})