var express = require('express')
var cors = require('cors')
var app = express()
var bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.json());

const heroes = [
      { id: 11, name: 'Superman' },  
      { id: 12, name: 'Wonder Woman' },  
      { id: 13, name: 'Captain America' },  
      { id: 14, name: 'Ironman' },  
      { id: 15, name: 'Green Arrow' },  
      { id: 16, name: 'Firestorm' },  
      { id: 17, name: 'Atom' },  
      { id: 18, name: 'The Hulk' },  
      { id: 19, name: 'Vibe' },  
      { id: 20, name: 'Gypsy' },  
    ];
 
// app.get('/', function (req, res) {
//   res.send('Hello World')
// })


// Return all heroes
app.get('/heroes', function (req, res) {
    res.status(200).json(heroes)
})


// Return individual heroes
app.get('/heroes/:id', function (req, res) {
    const id = req.params.id
    const hero = heroes.find(hero => hero.id == id)

    if(!hero){
        res.status(404).send("no hero found")
    }

    res.status(200).json(hero)
})


// Update individual hero
app.put('/heroes/:id', function (req, res) {
    const id = req.params.id
    // const hero = req.params.name
    if(!req.body) {
        return res.status(400).send("no body sent")
    }
    console.log(req.body)
    console.log(req.params.id)
    console.log(heroes
        .map(hero => hero.id))

    const heroIndex = heroes
        .map(hero => hero.id.toString())
        .indexOf(id)

    console.log(heroIndex)

    if(heroIndex === -1) {
        console.log("INSIDE NOT FOUND ERROR")
        return res.status(400).send(`hero not found with id '${id}'`)
    }

    heroes[heroIndex] = req.body
    //heroes[heroIndex].name = req.params.name
    // const oldhero = heroes.find(hero => hero.id == id)

    res.status(200).json({updated:true, errors: false})
})


// Create new hero
app.post('/heroes/:name', function (req, res) {
    const name = req.params.name
    const newId = heroes[heroes.length - 1].id + 1

    newhero = {id: newId, name}
    heroes.push(newhero)
    res.status(200).json({updated:true, errors: false, id: newhero.id, name: newhero.name})
})


// Delete hero
app.delete('/heroes/:id', function (req, res) {
    const id = req.params.id
    const hero = heroes.findIndex(hero => hero.id == id)
    
    // console.log(` Hero index: ${heroes.indexOf(id)}`)
    console.log(` ID index: ${id}`)
    console.log(` hero ID: ${hero.id}, ${hero}`)
    // heroes.splice(heroes[indexOf(id)])
    heroes.splice(hero,1)
    res.status(200).json({updated:true, errors: false})
})




// Listen port 3000 for requests
app.listen(3000, function(){
    console.log("listening on port 3000")
})

function newFunction(res) {
    res.id = id;
}

