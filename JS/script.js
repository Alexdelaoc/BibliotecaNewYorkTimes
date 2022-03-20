/* Siento mucho el estado de esta entrega. Definitivamente la retomaré y dejaré muchísimo más presentable... No me siento bien entregando en estas condiciones, pero prefiero que veáis lo que he hecho hasta ahora a no entregar nada, aunque esté a medias.*/


//Variables con elementos de la URL y la API key.
const urlBase = "https://api.nytimes.com/svc/books/v3/lists/";
const urlBooksList = "";
const apiKey = "fAqo1kJSkttYlAujHHRSHbgqXsvt5zRJ";


// Función para mostrar el Gif loader mientras la ventana esta en carga
window.onload = function (){
    const loader = document.querySelector(".loader");
    setTimeout(() => {
        loader.parentElement.removeChild(loader);
    }, 1500)
}


//Definimos la función asíncrona para traer el JSON de la API y pintarlo en el DOM
async function getLists() {
    try {
        let response = await fetch(`${urlBase}names.json?api-key=${apiKey}`);
        let data = await response.json();
        return data.results //devuelve un array de objetos []
    } catch (error) {
        console.log(`ERROR Error: ${error.stack}`)
    }
}


async function printLists() {
    await getLists()
        .then(arrayLists => {
            let listsContainer = document.querySelector("#lists__container"); //Defino una variable en la que guardo la sección contenedora de las tarjetas del array de objetos.
            listsContainer.innerHTML = " ";
            let listHeader = document.querySelector("#list__header");
            listHeader.innerHTML = " ";
            listsContainer.innerHTML = " ";

            for (const list of arrayLists) { //Ejecutamos la función por cada elemento del array.
                let createCard = printListsCard(list);
                listsContainer.appendChild(createCard);

            }
        })
}


function printListsCard(objectA) { //Por cada objeto del array

    //Div contenedor (card)
    let createDiv = document.createElement("div");
    createDiv.className = "list__container";
    document.querySelector("#lists__container").appendChild(createDiv);

    //Variables para crear los elementos de cada tarjeta.
    let listName = document.createElement("p");
    let listOldestDate = document.createElement("p");
    let listNewestDate = document.createElement("p");
    let updates = document.createElement("p");
    let aBooksButton = document.createElement("button");

    //Asigno las clases.
    listName.className = "list__name";
    listOldestDate.className = "oldest__date";
    listNewestDate.className = "newest__date";
    updates.className = "updates";
    aBooksButton.className = "list__button";
    aBooksButton.setAttribute("onClick", `printBookCards("${objectA.list_name_encoded}")`)

    //Apendamos el contenido de los elementos creados
    listName.innerHTML = objectA.list_name;
    listOldestDate.innerHTML = `Oldest: ${objectA.oldest_published_date}`;
    listNewestDate.innerHTML = `Newest: ${objectA.newest_published_date}`;
    updates.innerHTML = `Updated: ${objectA.updated.toLowerCase()}`;
    aBooksButton.innerHTML = "Read More!"

    //Apendamos los elementos creados a la sección
    createDiv.appendChild(listName);
    createDiv.appendChild(listOldestDate);
    createDiv.appendChild(listNewestDate);
    createDiv.appendChild(updates);
    createDiv.appendChild(aBooksButton);

    return createDiv;
}


//Función para crear los libros de la lista
function createBookContainer(oBook) {
    let bookCard = document.createElement("div");
    bookCard.className = "book__container";

    let rankPosition = document.createElement("p");
    let bookImage = document.createElement("img");
    let weeksDisplayed = document.createElement("p");
    let bookDescription = document.createElement("p");
    let amazonButtonLink = document.createElement("button");

    rankPosition.className = "book__rank";
    bookImage.className = "book__img";
    bookImage.setAttribute("src", `${oBook.book_image}`);
    bookImage.setAttribute("alt", "Book image");
    weeksDisplayed.className = "book__weeks";
    bookDescription.className = "book__description";
    amazonButtonLink.className = "book__amazon__button";
    amazonButtonLink.setAttribute("onClick", `window.open("${oBook.amazon_product_url}")`);

    rankPosition.innerHTML = `#${oBook.rank} ${oBook.title}`;
    weeksDisplayed.innerHTML = `Weeks on list: ${oBook.weeks_on_list}`;
    bookDescription.innerHTML = `${oBook.description}`;
    amazonButtonLink.innerHTML = "Link to Amazon";

    // Añado al divCard
    bookCard.appendChild(rankPosition);
    bookCard.appendChild(bookImage);
    bookCard.appendChild(weeksDisplayed);
    bookCard.appendChild(bookDescription);
    bookCard.appendChild(amazonButtonLink);

    return bookCard;
}


//Función conseguir libros de la lista seleccionada
async function getBooksList(list) {
    try {
        let response = await fetch(`${urlBase}${list}.json?api-key=${apiKey}`);
        let data = await response.json();
        displayName = data.results.display_name; // Sacamos el display name para echar mano de él cuando lo neceistemos.
        return data.results.books; // Sacamos el array de libros
    } catch (error) {
        console.log(`ERROR Error: ${error.stack}`);
    }
}


let displayName = "";
async function printBookCards(list) {
    await getBooksList(list)
        .then(arrayBooks => {

            // Metemos el display name en el header
            let headerList = document.querySelector("#list__header"); 
            let headerTextNode = document.createTextNode(`Books from the ${displayName} section`);
            headerList.appendChild(headerTextNode);

            let backButton = document.createElement("button");
            backButton.className = "back__btn";
            backButton.setAttribute("onClick", "printLists()")
            backButton.innerHTML = "Go back";
            headerList.appendChild(backButton);

            let listsContainer = document.querySelector("#lists__container");
            listsContainer.innerHTML = " ";

            for (const book of arrayBooks) {
                let createBook = createBookContainer(book);
                listsContainer.appendChild(createBook);
            }
        })
}


printLists();