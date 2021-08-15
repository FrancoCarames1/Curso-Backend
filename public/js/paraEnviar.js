const nuevoAnime = () => {

    const tituloInput = document.getElementById('titulo').value;
    const personajeInput = document.getElementById('personajePrincipal').value;

    console.log("Titulo: " + tituloInput, "Personaje principal: " + personajeInput);

    let animeAAgregar = {title: tituloInput, mainCharacter: personajeInput};

    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(animeAAgregar)
    };

    fetch('/api/productos', options)
        .then( res => res.json() )
        .then( anime => alert('Nuevo anime agregado: \n Título: ' + JSON.stringify(anime.title) + '\n Personaje principal: ' + anime.mainCharacter) )
        .then( () => { 
            document.getElementById('titulo').value = '';
            document.getElementById('personajePrincipal').value = '';
        })
        .catch(error => console.log(error) )
}