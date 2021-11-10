const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
// const { FehHeroes } = require('./feh.js');


const mongoose = require('mongoose');
const { Schema } = mongoose;

const fehSchema = new Schema({
    name: String,
    title: String,
    ultAtk: Number,
    stats: {
        hp: Number,
        atk: Number,
        spd: Number,
        def: Number,
        res: Number
    },
    isLegend: Boolean,
    isMythic: Boolean,
});

const FehHeroes = mongoose.model('FehHeroes', fehSchema);
// const feh = new FehHeroes({ name: "Lucina", title: "the swordy girl", ultAtk: 1 / 4, stats: { hp: 39, atk: 43, spd: 40, def: 52, res: 10 }, isLegend: false, isMythic: false });



const path = require('path');
const { stringify } = require('querystring');
app.use(bodyParser.urlencoded({ extended: false }));


const ike = new FehHeroes({ name: 'Ike', title: "the Dawn legend", ultAtk: 1 / 2, stats: { "hp": 40, "atk": 51, "spd": 42, "def": 32, "res": 23 }, isLegend: true, isMythic: false });
// const ephraim = new FehHeroes("Ephraim", "the lance master", 1 / 3, { hp: 45, atk: 51, spd: 25, def: 42, res: 20 }, false, true);
const ophelia = new FehHeroes({ name: "Ophelia", title: "the twilight witch", ultAtk: 1 / 3, stats: { hp: 30, atk: 60, spd: 43, def: 20, res: 15 }, isLegend: true, isMythic: true });
let fehHeroesY = [ike, ophelia];
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
    FehHeroes.find((err, result) => {
        //in case there is an error with our Dog model, we we will send it to the user(postman)
        if (err) {
            res.send("Error occured no dog retrieved")
            return
        }
        //if no error send the array conting dogs to the user/postman
        res.send(result)
        //log the result in the console as well
        console.log(result)
    })
})
app.get('/showheroes/:id', (req, res) => {
    const id = req.params.id;
    // we use the findById query, details on https://mongoosejs.com/docs/queries.html
    // this query only returns one element
    // you can also use findOneById
    // you can also use findOne({_id:}) - this query will find depending on other properties,
    //                                    e.g. breed, name
    //                                    will only return first element found
    // to return more then 1 element use find({}) // see previous request
    FehHeroes.findById(id, (err, hero) => {
        if (err) {
            res.send("Hero not found")

        }
        //"dog" is an object file retrieved from the database
        //"dog" will only be defined if there is a dog with the specific id
        // inside the Database
        // for a wrong ID, "dog" will be undefined

        //we will send it back to the user/postman
        res.send(hero)
        console.log(hero)
    })
})
app.post('/showheroes', (req, res) => {
    // res.send("yay ya post it");
    console.log(req.body);
    let name = req.body.name;
    let title = req.body.title;
    let ultAtk = parseFloat(req.body.ultAtk);

    // in postman it should be that => {"hp":45,"atk":51,"spd":25,"def":42,"res":20} 
    let stats = JSON.parse(req.body.stats);
    // console.log(stats);
    // console.log("here ars the stats :"+typeof stats); 
    // console.log(req.body.ultAtk);
    // console.log(parseFloat(req.body.ultAtk));
    // hp: req.body.stats.hp,
    // atk: req.body.stats.atk,
    // spd: req.body.stats.spd,
    // def: req.body.stats.def,
    // res: req.body.stats.res,


    let isLegend = (req.body.isLegend === 'true');
    let isMythic = (req.body.isMythic === 'true');
    let newHero = new FehHeroes({ name: name, title: title, ultAtk: ultAtk, stats: stats, isLegend: isLegend, isMythic: isMythic });
    newHero.save(err => {
        if (err) {
            // if error send a message to let the user know
            res.send('Hero not inseted into the database')
        }
        //send a message to the user with the result
        res.send("Hero inserted into the database")
        console.log("Hero is in the database")
    })
})

app.delete('/deleteHeroes/:id', (req, res) => {
    // You can use findOneAndDelete({_id:})
    // or
    // You can use findByIdAndDelete(id)
    //see https://mongoosejs.com/docs/api.html#model_Model.findByIdAndDelete
    FehHeroes.findByIdAndDelete(req.params.id, err => {
        if (err) {
            res.send("Hero did not delete")
            return
        }
        res.send("Hero deleted")
        console.log(`Hero with id ${req.params.id} is now deleted`)
        // console.log("Hero with id "+req.params.id + "is now deleted")
    })



})

app.put('/editHero/:id', (req, res) => {
    // you can use fineOneAndUpdate() see https://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate
    // or
    // you can use findByIdAndUpdate() see https://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate
    // You can use req.params.id to send the _id and req.body for your new variables
    // or you can send all variables, including id, in req.body

    console.log("Trying to edit");
    let name = req.body.name;
    let title = req.body.title;
    let ultAtk = parseFloat(req.body.ultAtk);
    let stats = JSON.parse(req.body.stats);
    let isLegend = (req.body.isLegend === 'true');
    let isMythic = (req.body.isMythic === 'true');
    // let newHero = new FehHeroes({ name: name, title: title, ultAtk: ultAtk, stats: stats, isLegend: isLegend, isMythic: isMythic });
    FehHeroes.findByIdAndUpdate(req.params.id, { name: name, title: title, ultAtk: ultAtk, stats: stats, isLegend: isLegend, isMythic: isMythic }, err => {
        if (err) {
            res.send("It didn't edit")
            return;

        }
        res.send("It did edit")
    })
    FehHeroes.findByIdAndUpdate(req.params.id,
        {
            name: req.body.name,
            age: ((parseInt(req.body.age) == NaN) ? 0 : parseInt(req.body.age)),
            breed: req.body.breed,
            isNeutred: (req.body.isNeutred === 'true')
        }, err => {
            if (err) {
                res.send("It didn't edit. The error is: " + err)
                return;
            }
            res.send("It did edit")
        })


})

app.post('/feh/', (req, res) => {
    console.log("inserting in db");
    fehSchema
})



app.listen(port, () => {
    mongoose.connect('mongodb+srv://admin:admin@fehapi.leurh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');


    console.log(`Example app listening at http://localhost:${port}`)
})