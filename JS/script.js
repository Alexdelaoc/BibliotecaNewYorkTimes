//Constante con la api key
const NEW_YORK_TIMES_API_KEY = "fAqo1kJSkttYlAujHHRSHbgqXsvt5zRJ";

//Definimos la función asíncrona para traer el JSON de la API y pintarlo en el DOM
async function getLists() {
    try {
        let response = await fetch(`https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=${NEW_YORK_TIMES_API_KEY}`);
        let data = await response.json();
        let results = data.results;
    } catch (error) {
        console.log(`ERROR Error: ${error.stack}`);
    };

    //Iteramos con un bucle cada uno de los objetos del array devuelto por la API y los pintamos en el DOM
    for (let i = 0; i < results.length; i++) {
        let createDiv = document.createElement("div");
        createDiv.className("list_container"):
        document.querySelector("#lists_container").appendChild(createDiv):
    }
};
getLists();