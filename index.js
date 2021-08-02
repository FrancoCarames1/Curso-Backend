const fs = require("fs");
class Desafio2 {
    constructor(nombreDeArchivo) {
        this.nombreDeArchivo = nombreDeArchivo;
        this.data = []
    }
    async getAll() {
        try {
            let info = await fs.promises.readFile(this.nombreDeArchivo, "UTF-8");
            if (info){
                this.data =  JSON.parse(info);
                return (this.data)
            }
        } catch (error) {
            return
        }
    }
    async getById(numero) {
        let array = await this.getAll();
        let animeBuscado = array.find((x) => x.id === numero);
        if (animeBuscado === undefined) {
            console.log("Error, no hay ningún anime con ese id");
        } else {
            return animeBuscado;
        }
    }
    async deleteById(numero) {
        let array = await this.getAll();
        let posicionAnimeBuscado = array.findIndex((x) => x.id === numero);
        if (posicionAnimeBuscado === -1) {
            console.log("Error, no existe un anime con ese id");
        } else {
            array.splice(posicionAnimeBuscado, 1);
            let pasarloAJSON = JSON.stringify(array);
            try {
                await fs.promises.writeFile(this.nombreDeArchivo, pasarloAJSON);
            } catch (error) {
                console.log("Error");
            }
        }
    }
    async deleteAll() {
        try {
            await fs.promises.writeFile(this.nombreDeArchivo, "[]");
            console.log("Borrado");
        } catch (error) {
            console.log("Error");
        }
    }
    async save(objeto) {
        let array = await this.getAll();
        if (array) {
            let idMax = 0;
            array.forEach((e) => {
                if (e.id > idMax) {
                    idMax = e.id;
                }
            });
            let objetoAAgregar = Object.defineProperty(objeto, "id", {
                value: idMax + 1,
                writable: true,
                enumerable: true,
                configurable: true,
            });
            array.push(objetoAAgregar);
            let pasarloAJSON = JSON.stringify(array);
            try {
                await fs.promises.writeFile(this.nombreDeArchivo, pasarloAJSON);
                return objetoAAgregar.id;
            } catch (error) {
                console.log("Error");
            }
        }
    }
}

let animes = new Desafio2("archivo.txt");

async function funcionMostrar () {
    console.log(await animes.getAll());
    console.log(await animes.getById(2));
    console.log("Id del anime agregado:",await animes.save({ title: "Boku No Hero Academia", mainCharacter: "Deku" }));
    console.log("Id del anime agregado:",await animes.save({ title: "Dragon Ball", mainCharacter: "Goku" }));
    console.log(await animes.getAll());
    await animes.deleteById(4);
    console.log(await animes.getAll());
    // await animes.deleteAll();
    // console.log(await animes.getAll());
}
funcionMostrar()


