// Consigna: 
// 1) Declarar una clase Usuario

// 2) Hacer que Usuario cuente con los siguientes atributos:
// nombre: String
// apellido: String
// libros: Object[]
// mascotas: String[]

// Los valores de los atributos se deberán cargar a través del constructor, al momento de crear las instancias.

// 3) Hacer que Usuario cuente con los siguientes métodos:
// getFullName(): String. Retorna el completo del usuario. Utilizar template strings.
// addMascota(String): void. Recibe un nombre de mascota y lo agrega al array de mascotas.
// countMascotas(): Number. Retorna la cantidad de mascotas que tiene el usuario.
// addBook(String, String): void. Recibe un string 'nombre' y un string 'autor' y debe agregar un objeto: { nombre: String, autor: String } al array de libros.
// getBookNames(): String[]. Retorna un array con sólo los nombres del array de libros del usuario.
// 4) Crear un objeto llamado usuario con valores arbitrarios e invocar todos sus métodos.

const arrayDeTitulos = []

class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre
        this.apellido = apellido
        this.libros = libros
        this.mascotas = mascotas
    }

    getFullName(){
        console.log(`Nombre completo: ${this.nombre} ${this.apellido}`)
    }

    addMascota(mascotaNueva){
        if(Array.isArray(this.mascotas)){
            this.mascotas.push(mascotaNueva)
            console.log(this.mascotas)
        }else{
            console.log("No me estas pasando un array maestro")
        }
    }

    countMascotas(){
        console.log(this.mascotas.length)
    }

    addBook(titulo,autorDelLibro){
        this.libros.push({nombre: titulo, autor: autorDelLibro})
        console.log(this.libros[this.libros.length - 1])
    }

    getBookNames(){
        for (let i= 0; i< this.libros.length; i++){
            let objetos =this.libros[i]
            arrayDeTitulos.push(objetos.nombre)
        }
        console.log(arrayDeTitulos)
    }
}

let Usuario1 = new Usuario("Mirtha","Legrand",[{nombre:"Cuando conocí al recién nacido Jesus" , autor:"Mirtha Legrand"}],["Pepe","Pepo"])

// Usuario1.getFullName()
// Usuario1.addMascota("Maria Marta")
// Usuario1.countMascotas()
Usuario1.addBook("Libro Nuevo", "Peron")
Usuario1.getBookNames()