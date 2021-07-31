const fs = require('fs');
class Desafio2 {
    constructor(nombreDeArchivo){
        this.nombreDeArchivo = nombreDeArchivo;
    }
    getAll(){
        try{
            let data = fs.readFileSync(this.nombreDeArchivo, 'UTF-8');
        let transformandoEnArray = JSON.parse(data);
        return (transformandoEnArray);
        } catch (error){
            console.log(error);
        }
    }
    async getById(numero){
        let array = this.getAll();
        let animeBuscado = array.find(x => x.id === numero);
        if (animeBuscado === undefined){
            console.log("Error, no hay ningún anime con ese id");
        }else{
            return(animeBuscado)
        }
    }
    async deleteById(numero){
        let array = this.getAll();
        let posicionAnimeBuscado = array.findIndex(x => x.id === numero);
        if(posicionAnimeBuscado === -1){
            console.log("Error, no existe un anime con ese id")
        }else{
            array.splice(posicionAnimeBuscado,1);
            console.log(array);
            let pasarloAJSON = JSON.stringify(array);
            try{
                await fs.promises.writeFile(this.nombreDeArchivo, pasarloAJSON);
            } catch (error){
                console.log("Error");
            }
        }
    }
    async deleteAll(){
        try{
            await fs.promises.writeFile(this.nombreDeArchivo, "[]");
            console.log("Borrado");
        }catch (error){
            console.log("Error");
        }
    }
    async save(objeto){
        let array = this.getAll();
        let idMax = 0;
        array.forEach(e => {
            if(e.id > idMax){
                idMax = e.id;
            }
        });
        let objetoAAgregar = Object.defineProperty(objeto, "id",{
            value: idMax+1,
            writable: true,
            enumerable: true,
            configurable: true
        });
        array.push(objetoAAgregar);
        let pasarloAJSON = JSON.stringify(array);
        try{
            await fs.promises.writeFile(this.nombreDeArchivo, pasarloAJSON);
            return(objetoAAgregar.id);
        } catch (error){
            console.log("Error");
        }
    }
}
let animes = new Desafio2("archivo.txt");
console.log("Anime obtenido por id:",animes.getById(3));
console.log("Animes:",animes.getAll());
//console.log("Id del anime agregado:",animes.save({title:"Boku No Hero Academia", mainCharacter:"Deku"}));
//animes.deleteById(4);
//animes.deleteAll();
