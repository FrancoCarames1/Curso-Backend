const Desafio2 = require('./clase.js');

let animes = new Desafio2('./archivo.txt');

async function funcionMostrar () {
//     console.log(await animes.getAll());
//     console.log(await animes.getById(2));
    console.log("Id del anime agregado:",await animes.save({ title: "Sword Art Online", mainCharacter: "Kirito" }));
//     console.log("Id del anime agregado:",await animes.save({ title: "Dragon Ball", mainCharacter: "Goku" }));
//     console.log(await animes.getAll());
//     await animes.deleteById(4);
//     console.log(await animes.getAll());
//     // await animes.deleteAll();
//     // console.log(await animes.getAll());
}
// funcionMostrar() //lo comento porque ya agregué un anime más para formatear el documento

const express = require('express');

const app = express();

const PORT = 3000;

app.get("/", (req, res, next) =>{
    res.send('Hola mundo servidor express')
});

app.get("/productos", (req, res, next) =>{
    async function todosLosProductos () {
        let mostrar = await animes.getAll()
        res.send(mostrar)
    }
    todosLosProductos()
});

app.get("/productoRandom", (req, res, next) =>{
    function getRandomInt(max) {
        return Math.floor(Math.random() * (max));
    }

    async function productoAlAzar () {
        let todos = await animes.getAll();
        let max = todos.length;
        let numeroRandom = getRandomInt(max);
        let mostrar = todos[numeroRandom];
        res.send(mostrar);
    }
    productoAlAzar()
})

const server = app.listen(PORT, () =>{
    console.log("servidor puerto 3000")
});

server.on("error", error => console.log(`Error en servidos ${error}`));

