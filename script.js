const listUrl = "https://pokeapi.co/api/v2/pokemon?limit=3";

// On stoque dans la variable cards le div avec la classe cards
const cards = document.querySelector(".cards");

// Le tableau de chats à adopter
const animalsToAdopt = [
  {
    name: "Lucky",
    picture: "https://placekitten.com/200/287"
  },
  {
    name: "Symba",
    picture: "https://placekitten.com/200/139"
  },
  {
    name: "Léo",
    picture: "https://placekitten.com/200/90"
  },
  {
    name: "Milo",
    picture: "https://placekitten.com/200/194"
  },
  {
    name: "Charly",
    picture: "https://placekitten.com/200/179"
  }
];


function createCard(title, imageUrl) {

  // On crée un div avec la classe card
  const card = document.createElement("div");
  card.classList.add("card");
  cards.appendChild(card);

  // On crée un div avec la classe card-header et on l'ajoute à la card
  const cardHeader = document.createElement("div");
  cardHeader.classList.add("card-header");
  card.appendChild(cardHeader);

  // On crée un div avec la classe card-img et on l'ajoute à la cardHeader
  const cardImg = document.createElement("div");
  cardImg.style.backgroundImage = `url(${imageUrl})`;
  cardImg.classList.add("card-img");
  cardHeader.appendChild(cardImg);

  /**
   * Étape 1: Créez la div cardBody, ajoutez la classe card-body et ajoutez-la à la carte
   */
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  card.appendChild(cardBody);

  /**
   * Étape 2
   * Créez le h2 cardTitle, ajoutez la classe card-title,
   * définissez le texte à l'intérieur de la balise sur le paramètre "title" de cette fonction
   * et ajoutez-le à la cardBody
   */
  const cardTitle = document.createElement("h2");
  cardTitle.classList.add("card-title");
  cardTitle.textContent = title;
  cardBody.appendChild(cardTitle);
}

/**
 * Étape 4
 * Créez une boucle for, pour chaque élément du tableau,
 * appelez la fonction createCard avec le paramètre correspondant
 */

for (let i = 0; i < animalsToAdopt.length; i++) {
  createCard(animalsToAdopt[i].name, animalsToAdopt[i].picture);
}


/* fetch(listUrl)
.then(response => response.json())
.then((listData) => {
  const pokemons = listData.results;

  pokemons.forEach(pokemon => {
    fetch(pokemon.url)
    .then(response => response.json())
    .then((data) => {
      console.log(data);
    })
  });
}); */
