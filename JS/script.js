//Constante con la api key
const NEW_YORK_TIMES_API_KEY = "fAqo1kJSkttYlAujHHRSHbgqXsvt5zRJ";

//Definimos la función asíncrona para traer el JSON de la API y pintarlo en el DOM
async function getLists() {
    try {
        let response = await fetch(`https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=${NEW_YORK_TIMES_API_KEY}`);
        let data = await response.json();
        return data.results //devuelve un array de objetos  []
    } catch (error) {
        console.log(`ERROR Error: ${error.stack}`);
    }
}

async function printLists() {
    await getLists()
        .then(arrayLists => {
            let listsContainer = document.querySelector("#lists_container"); //Defino una variable en la que guardo la sección contenedora de las tarjetas del array de objetos.

            for (const list of arrayLists) {
                let createCard = printCard(list);
                listsContainer.appendChild(createCard);
            }
        })
}


function printCard(objectA) { //Por cada objeto del array
    
    //Div contenedor (card)
    let createDiv = document.createElement("div");
    createDiv.className = "list_container";
    document.querySelector("#lists_container").appendChild(createDiv);

    //Variables para crear los elementos de cada tarjeta.
    let listName = document.createElement("p");
    let listOldestDate = document.createElement("p");
    let listNewestDate = document.createElement("p");
    let updates = document.createElement("p");
    let aBooksLink = document.createElement("a");
    let aBooksButton = document.createElement("button")

    //Asigno las clases.
    listName.className = "list_name";
    listOldestDate.className = "oldest_date";
    listNewestDate.className = "newest_date";
    updates.className = "updates";
    aBooksButton.type = "click";
    aBooksLink.href = "./pages/books_list.html";

    //Se apenda el link que nos llevará a la página con los libros de la lista seleccionada al botón.
    aBooksButton.appendChild(aBooksLink);
    aBooksLink.innerHTML = "READ MORE!";

    //Apendamos el contenido de los elementos creados
    listName.innerHTML = objectA.list_name;
    listOldestDate.innerHTML = `Oldest: ${objectA.oldest_published_date}`;
    listNewestDate.innerHTML = `Newest: ${objectA.newest_published_date}`;
    updates.innerHTML = `Updated: ${objectA.updated.toLowerCase()}`;

    //Apendamos los elementos creados a la sección
    createDiv.appendChild(listName);
    createDiv.appendChild(listOldestDate);
    createDiv.appendChild(listNewestDate);
    createDiv.appendChild(updates);
    createDiv.appendChild(aBooksButton);

    return createDiv;
}

printLists();