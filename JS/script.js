//Constante con la api key
const NEW_YORK_TIMES_API_KEY = "fAqo1kJSkttYlAujHHRSHbgqXsvt5zRJ";

//Definimos la función asíncrona para traer el JSON de la API y pintarlo en el DOM
async function getLists() {
    try {
        let response = await fetch(`https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=${NEW_YORK_TIMES_API_KEY}`);
        let data = await response.json();
        let results = data.results;

        //Iteramos con un bucle cada uno de los objetos del array devuelto por la API y los pintamos en el DOM
        for (let i = 0; i < results.length; i++) {
            let createDiv = document.createElement("div");
            createDiv.className = "list_container";
            document.querySelector("#lists_container").appendChild(createDiv);

            let listName = document.createElement("p");
            let listNameEncoded = document.createElement("p")
            let listOldestDate = document.createElement("p");
            let listNewestDate = document.createElement("p");
            let updates = document.createElement("p");
            let aBooksLink = document.createElement("a");
            let aBooksButton = document.createElement("button")

            listName.className = "list_name";
            listOldestDate.className = "oldest_date";
            listNewestDate.className = "newest_date";
            updates.className = "updates";
            aBooksButton.type = "click";
            aBooksLink.href = "./pages/books_list.html";

            //
            aBooksButton.appendChild(aBooksLink);
            aBooksLink.innerHTML = "READ MORE!";

            //Apendamos los elementos creados a la sección
            createDiv.appendChild(listName);
            createDiv.appendChild(listOldestDate);
            createDiv.appendChild(listNewestDate);
            createDiv.appendChild(updates);
            createDiv.appendChild(aBooksButton);

            //Apendamos el contenido de los elementos creados
            listName.innerHTML = `${results[i].list_name}`;
            listOldestDate.innerHTML = `Oldest: ${results[i].oldest_published_date}`;
            listNewestDate.innerHTML = `Newest: ${results[i].newest_published_date}`;
            updates.innerHTML = `Updated: ${results[i].updated.toLowerCase()}`;
        };
    } catch (error) {
        console.log(`ERROR Error: ${error.stack}`);
    };
    };
getLists();