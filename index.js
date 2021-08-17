const Desafio2 = require('./src/clase.js');

let animes = new Desafio2('./archivo.json');

const express = require('express');

const app = express();

const PORT = 8080;

const router = express.Router();

app.use(express.json());

app.use(express.static('public'));

app.use('/api/productos', router);

router.get("/", (req, res) =>{
    async function todosLosProductos () {
        let mostrar = await animes.getAll()
        res.send(mostrar)
    }
    todosLosProductos()
});

router.put("/:id", async (req, res) =>{

    const {id} = req.params;

    const {body} = req;

    const preCambio = await animes.getById(parseInt(id));

    const postCambio = await animes.updateById(parseInt(id), body);

    if (preCambio) {

        res.send({ postCambio });
    
    } else {
    
        res.send('El producto no fue encontrado, verificar si existe.')
    }
})

router.get("/:id", (req, res) =>{

    const {id} = req.params;

    async function productoAlAzar () {
        mostrar = await animes.getById(parseInt(id))
        res.send(mostrar);
    }
    productoAlAzar()
})

router.delete("/:id", (req, res) =>{

    const {id} = req.params;

    async function productoAlAzar () {
        mostrar = await animes.deleteById(parseInt(id))
        res.send(mostrar);
    }
    productoAlAzar()
})

app.listen(PORT, () =>{
    console.log("servidor http://localhost:8080/")
});

app.get('/server', (req, res) => {
    res.send({server: 'Express'})
})

router.post('/', async (req, res) => {

    const { body } = req;

    await animes.save(body);

    res

    res.send(body)
});